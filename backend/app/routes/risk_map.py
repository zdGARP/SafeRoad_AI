from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.models import Location, Accident, RiskScore
from app.services.risk_engine import get_risk_level

router = APIRouter(prefix="/risk-map", tags=["Risk Map"])

@router.get("")
def get_risk_map_data(
    state: Optional[str] = None,
    district: Optional[str] = None,
    risk_level: Optional[str] = None,
    road_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Location)
    if state:
        query = query.filter(Location.state.ilike(f"%{state}%"))
    if district:
        query = query.filter(Location.district.ilike(f"%{district}%"))
    if road_type:
        query = query.filter(Location.road_type.ilike(f"%{road_type}%"))
    
    locations = query.all()
    results = []
    
    for loc in locations:
        accidents = db.query(Accident).filter(Accident.location_id == loc.id).all()
        acc_count = len(accidents)
        fatalities = sum(a.fatalities for a in accidents)
        injuries = sum(a.injuries for a in accidents)
        
        latest_risk = db.query(RiskScore).filter(RiskScore.location_id == loc.id).order_by(RiskScore.calculated_at.desc()).first()
        score = latest_risk.score if latest_risk else 50
        level = latest_risk.risk_level if latest_risk else get_risk_level(score)
        
        if risk_level and level.upper() != risk_level.upper():
            continue
            
        results.append({
            "id": loc.id,
            "name": loc.name,
            "state": loc.state,
            "district": loc.district,
            "city": loc.city,
            "latitude": loc.latitude,
            "longitude": loc.longitude,
            "road_type": loc.road_type,
            "accidents": acc_count,
            "fatalities": fatalities,
            "injuries": injuries,
            "risk_score": score,
            "risk_level": level,
        })
        
    return results

@router.get("/hotspots")
def get_hotspots(db: Session = Depends(get_db)):
    map_data = get_risk_map_data(db=db)
    return [loc for loc in map_data if loc["risk_level"] in ["HIGH", "CRITICAL"]]

@router.get("/corridors")
def get_corridor_summary(db: Session = Depends(get_db)):
    map_data = get_risk_map_data(db=db)
    # Group by road_type / corridor
    corridors = {}
    for loc in map_data:
        rtype = loc["road_type"]
        if rtype not in corridors:
            corridors[rtype] = {
                "corridor_name": rtype,
                "location_count": 0,
                "total_accidents": 0,
                "total_fatalities": 0,
                "avg_risk_score": 0,
                "high_risk_spots": 0,
                "scores": []
            }
        corridors[rtype]["location_count"] += 1
        corridors[rtype]["total_accidents"] += loc["accidents"]
        corridors[rtype]["total_fatalities"] += loc["fatalities"]
        corridors[rtype]["scores"].append(loc["risk_score"])
        if loc["risk_level"] in ["HIGH", "CRITICAL"]:
            corridors[rtype]["high_risk_spots"] += 1
            
    summary = []
    for cname, cdata in corridors.items():
        avg_score = round(sum(cdata["scores"]) / len(cdata["scores"])) if cdata["scores"] else 50
        summary.append({
            "corridor_name": cname,
            "location_count": cdata["location_count"],
            "total_accidents": cdata["total_accidents"],
            "total_fatalities": cdata["total_fatalities"],
            "avg_risk_score": avg_score,
            "overall_risk_level": get_risk_level(avg_score),
            "high_risk_spots": cdata["high_risk_spots"]
        })
    return summary
