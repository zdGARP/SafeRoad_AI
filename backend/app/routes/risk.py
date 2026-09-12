from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Location, RiskScore, Accident
from app.services.risk_engine import calculate_risk_score, get_risk_level

router = APIRouter(prefix="/risk", tags=["Risk Engine"])

@router.get("/latest")
def get_latest_risk_scores(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    results = []
    for loc in locations:
        latest = db.query(RiskScore).filter(RiskScore.location_id == loc.id).order_by(RiskScore.calculated_at.desc()).first()
        if not latest:
            # Recalculate
            accidents = db.query(Accident).filter(Accident.location_id == loc.id).all()
            acc_count = len(accidents)
            fatalities = sum(a.fatalities for a in accidents)
            score, confidence = calculate_risk_score(acc_count, fatalities, loc.road_type)
            level = get_risk_level(score)
            latest = RiskScore(
                location_id=loc.id,
                score=score,
                risk_level=level,
                confidence=confidence
            )
            db.add(latest)
            db.commit()
            db.refresh(latest)
            
        results.append({
            "location_id": loc.id,
            "location_name": loc.name,
            "state": loc.state,
            "road_type": loc.road_type,
            "score": latest.score,
            "risk_level": latest.risk_level,
            "confidence": latest.confidence,
            "calculated_at": latest.calculated_at
        })
    return results

@router.post("/calculate")
def recalculate_all_risks(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    updated = []
    for loc in locations:
        accidents = db.query(Accident).filter(Accident.location_id == loc.id).all()
        acc_count = len(accidents)
        fatalities = sum(a.fatalities for a in accidents)
        score, confidence = calculate_risk_score(acc_count, fatalities, loc.road_type)
        level = get_risk_level(score)
        
        new_risk = RiskScore(
            location_id=loc.id,
            score=score,
            risk_level=level,
            confidence=confidence
        )
        db.add(new_risk)
        updated.append({
            "location_id": loc.id,
            "location_name": loc.name,
            "score": score,
            "risk_level": level,
            "confidence": confidence
        })
    db.commit()
    return {"status": "success", "recalculated_locations": len(updated), "details": updated}

@router.get("/history/{location_id}")
def get_risk_history(location_id: int, db: Session = Depends(get_db)):
    loc = db.query(Location).filter(Location.id == location_id).first()
    if not loc:
        raise HTTPException(status_code=404, detail="Location not found")
        
    scores = db.query(RiskScore).filter(RiskScore.location_id == location_id).order_by(RiskScore.calculated_at.asc()).all()
    return {
        "location_id": loc.id,
        "location_name": loc.name,
        "history": [
            {
                "score": s.score,
                "risk_level": s.risk_level,
                "confidence": s.confidence,
                "calculated_at": s.calculated_at
            }
            for s in scores
        ]
    }
