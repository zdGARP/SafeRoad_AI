from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Location, Accident, RiskScore, Prediction

router = APIRouter(prefix="/intelligence", tags=["Intelligence"])

@router.get("/summary")
def get_intelligence_summary(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    accidents = db.query(Accident).all()
    total_accidents = len(accidents)
    total_fatalities = sum(a.fatalities for a in accidents)
    
    high_critical = 0
    for loc in locations:
        latest = db.query(RiskScore).filter(RiskScore.location_id == loc.id).order_by(RiskScore.calculated_at.desc()).first()
        if latest and latest.risk_level in ["HIGH", "CRITICAL"]:
            high_critical += 1
            
    return {
        "monitored_corridors": len(set(l.road_type for l in locations)),
        "high_risk_zones": high_critical,
        "total_accidents": total_accidents,
        "total_fatalities": total_fatalities,
        "ai_status": "ONLINE",
        "confidence_avg": 88
    }

@router.get("/alerts")
def get_intelligence_alerts(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    alerts = []
    
    for loc in locations:
        latest_risk = db.query(RiskScore).filter(RiskScore.location_id == loc.id).order_by(RiskScore.calculated_at.desc()).first()
        if latest_risk and latest_risk.score >= 80:
            alerts.append({
                "id": f"alert-{loc.id}",
                "severity": "CRITICAL" if latest_risk.score >= 88 else "HIGH",
                "title": f"High Risk Advisory: {loc.name}",
                "location": f"{loc.name}, {loc.state}",
                "message": f"Risk score reached {latest_risk.score}/100 on {loc.road_type}. Immediate speed & enforcement intervention recommended.",
                "timestamp": latest_risk.calculated_at.isoformat() if latest_risk.calculated_at else "Recently"
            })
            
    return alerts
