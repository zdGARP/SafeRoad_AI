from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db
from app.models.models import Location, RiskScore, Accident, Intervention, SimulationResult
from app.services.intervention_engine import recommend_interventions, simulate_impact, INTERVENTION_CATALOG

router = APIRouter(prefix="/interventions", tags=["Interventions & Simulation"])

class SimulationReq(BaseModel):
    location_id: Optional[int] = 1
    selected_interventions: List[str]

class InterventionCreateReq(BaseModel):
    location_id: int
    name: str
    reason: str
    expected_reduction: float
    estimated_cost: str
    priority: str
    confidence: Optional[int] = 88

@router.get("/recommended")
def get_recommended_interventions(location_id: Optional[int] = None, db: Session = Depends(get_db)):
    if location_id:
        loc = db.query(Location).filter(Location.id == location_id).first()
        if not loc:
            raise HTTPException(status_code=404, detail="Location not found")
        latest_risk = db.query(RiskScore).filter(RiskScore.location_id == loc.id).order_by(RiskScore.calculated_at.desc()).first()
        score = latest_risk.score if latest_risk else 50
    else:
        score = 80
        
    recommended = recommend_interventions(score)
    return {
        "location_id": location_id,
        "interventions": recommended
    }

@router.get("/catalog")
def get_catalog():
    return INTERVENTION_CATALOG

@router.post("/simulate-impact")
def run_simulation(req: SimulationReq, db: Session = Depends(get_db)):
    current_accidents = 142
    if req.location_id:
        accidents = db.query(Accident).filter(Accident.location_id == req.location_id).all()
        if len(accidents) > 0:
            current_accidents = len(accidents)
            
    res = simulate_impact(req.selected_interventions, current_accidents=current_accidents)
    res["location_id"] = req.location_id
    
    # Store simulation log
    sim_db = SimulationResult(
        location_id=req.location_id or 1,
        selected_interventions=req.selected_interventions,
        current_accidents=current_accidents,
        predicted_accidents=res["predicted_accidents"],
        estimated_reduction=res["estimated_reduction"]
    )
    db.add(sim_db)
    db.commit()
    
    return res

@router.post("")
def create_intervention(req: InterventionCreateReq, db: Session = Depends(get_db)):
    loc = db.query(Location).filter(Location.id == req.location_id).first()
    if not loc:
        raise HTTPException(status_code=404, detail="Location not found")
        
    item = Intervention(
        location_id=req.location_id,
        name=req.name,
        reason=req.reason,
        expected_reduction=req.expected_reduction,
        estimated_cost=req.estimated_cost,
        priority=req.priority,
        confidence=req.confidence or 88
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/history")
def get_intervention_history(db: Session = Depends(get_db)):
    sims = db.query(SimulationResult).order_by(SimulationResult.created_at.desc()).all()
    results = []
    for s in sims:
        loc = db.query(Location).filter(Location.id == s.location_id).first()
        results.append({
            "id": s.id,
            "location_name": loc.name if loc else "Corridor",
            "selected_interventions": s.selected_interventions,
            "current_accidents": s.current_accidents,
            "predicted_accidents": s.predicted_accidents,
            "estimated_reduction": s.estimated_reduction,
            "created_at": s.created_at
        })
    return results
