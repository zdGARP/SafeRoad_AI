from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.models.models import Accident, Location

router = APIRouter(prefix="/analytics", tags=["Accident Analytics"])

@router.get("/accidents")
def get_accidents(
    location_id: Optional[int] = None,
    severity: Optional[str] = None,
    vehicle_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Accident)
    if location_id:
        query = query.filter(Accident.location_id == location_id)
    if severity:
        query = query.filter(Accident.severity.ilike(f"%{severity}%"))
    if vehicle_type:
        query = query.filter(Accident.vehicle_type.ilike(f"%{vehicle_type}%"))
        
    accidents = query.order_by(Accident.date.desc()).all()
    results = []
    for a in accidents:
        loc = db.query(Location).filter(Location.id == a.location_id).first()
        results.append({
            "id": a.id,
            "location_id": a.location_id,
            "location_name": loc.name if loc else "Unknown",
            "state": loc.state if loc else "Unknown",
            "road_type": loc.road_type if loc else "Unknown",
            "date": a.date,
            "time": a.time,
            "vehicle_type": a.vehicle_type,
            "cause": a.cause,
            "severity": a.severity,
            "fatalities": a.fatalities,
            "injuries": a.injuries
        })
    return results

@router.get("/trends")
def get_accident_trends(db: Session = Depends(get_db)):
    accidents = db.query(Accident).all()
    months = {}
    for a in accidents:
        # date format YYYY-MM-DD
        m = a.date[:7] if len(a.date) >= 7 else "2024-01"
        if m not in months:
            months[m] = {"month": m, "accidents": 0, "fatalities": 0, "injuries": 0}
        months[m]["accidents"] += 1
        months[m]["fatalities"] += a.fatalities
        months[m]["injuries"] += a.injuries
        
    trend_list = [months[k] for k in sorted(months.keys())]
    return trend_list

@router.get("/severity-distribution")
def get_severity_distribution(db: Session = Depends(get_db)):
    accidents = db.query(Accident).all()
    dist = {"Fatal": 0, "Grievous": 0, "Minor": 0}
    for a in accidents:
        sev = a.severity.capitalize()
        if sev in dist:
            dist[sev] += 1
        else:
            dist[sev] = 1
            
    total = len(accidents) or 1
    result = []
    for category, count in dist.items():
        result.append({
            "severity": category,
            "count": count,
            "percentage": round((count / total) * 100, 1)
        })
    return result
