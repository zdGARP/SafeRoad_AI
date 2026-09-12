from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Accident

router = APIRouter(prefix="/time-risk", tags=["Time-based Risk"])

@router.get("/hourly")
def get_hourly_risk(db: Session = Depends(get_db)):
    accidents = db.query(Accident).all()
    hourly = {h: 0 for h in range(24)}
    for a in accidents:
        # time format HH:MM
        try:
            hour = int(a.time.split(":")[0])
            if 0 <= hour <= 23:
                hourly[hour] += 1
        except Exception:
            pass
            
    result = []
    for h, cnt in hourly.items():
        time_str = f"{h:02d}:00"
        result.append({
            "hour": h,
            "time": time_str,
            "accident_count": cnt,
            "risk_score": min(100, cnt * 8 + 20)
        })
    return result

@router.get("/peak-hours")
def get_peak_hours(db: Session = Depends(get_db)):
    hourly = get_hourly_risk(db=db)
    sorted_hours = sorted(hourly, key=lambda x: x["accident_count"], reverse=True)
    return {
        "primary_peak": sorted_hours[0] if sorted_hours else None,
        "secondary_peak": sorted_hours[1] if len(sorted_hours) > 1 else None,
        "high_risk_window": "18:00 - 22:00",
        "description": "Peak accident rates occur during evening rush hours and early night transitions."
    }

@router.get("/day-vs-night")
def get_day_vs_night(db: Session = Depends(get_db)):
    accidents = db.query(Accident).all()
    day_count = 0 # 06:00 to 18:00
    night_count = 0
    
    day_fatal = 0
    night_fatal = 0
    
    for a in accidents:
        try:
            hour = int(a.time.split(":")[0])
            if 6 <= hour < 18:
                day_count += 1
                day_fatal += a.fatalities
            else:
                night_count += 1
                night_fatal += a.fatalities
        except Exception:
            day_count += 1
            
    total = len(accidents) or 1
    return {
        "daytime": {
            "time_window": "06:00 - 18:00",
            "count": day_count,
            "percentage": round((day_count / total) * 100, 1),
            "fatalities": day_fatal
        },
        "nighttime": {
            "time_window": "18:00 - 06:00",
            "count": night_count,
            "percentage": round((night_count / total) * 100, 1),
            "fatalities": night_fatal
        }
    }
