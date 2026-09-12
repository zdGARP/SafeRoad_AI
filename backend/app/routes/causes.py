from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Accident

router = APIRouter(prefix="/causes", tags=["Cause Analysis"])

@router.get("/breakdown")
def get_causes_breakdown(db: Session = Depends(get_db)):
    accidents = db.query(Accident).all()
    causes = {}
    for a in accidents:
        c = a.cause
        if c not in causes:
            causes[c] = {"cause": c, "count": 0, "fatalities": 0}
        causes[c]["count"] += 1
        causes[c]["fatalities"] += a.fatalities
        
    total = len(accidents) or 1
    results = []
    for cname, data in sorted(causes.items(), key=lambda x: x[1]["count"], reverse=True):
        results.append({
            "cause": cname,
            "count": data["count"],
            "percentage": round((data["count"] / total) * 100, 1),
            "fatalities": data["fatalities"]
        })
    return results

@router.get("/contributing-factors")
def get_contributing_factors(db: Session = Depends(get_db)):
    return [
        {"factor": "Human Error (Over-speeding, Drunk Driving)", "contribution": 72.4},
        {"factor": "Infrastructure Defect (Potholes, Blind Corners)", "contribution": 15.8},
        {"factor": "Weather & Low Visibility (Fog, Heavy Rain)", "contribution": 7.3},
        {"factor": "Mechanical Failure (Brake/Tire Burst)", "contribution": 4.5}
    ]
