import datetime
import random
from sqlalchemy.orm import Session
from app.models.models import Location, Accident, RiskScore, Prediction, Intervention, User
from app.utils.security import hash_password

INITIAL_LOCATIONS = [
    {
        "id": 1,
        "name": "Chennai NH Junction 04",
        "state": "Tamil Nadu",
        "district": "Chennai Urban",
        "city": "Chennai",
        "latitude": 13.0827,
        "longitude": 80.2707,
        "road_type": "National Highway",
        "risk_score": 87,
        "risk_level": "CRITICAL"
    },
    {
        "id": 2,
        "name": "Bengaluru Outer Ring Road",
        "state": "Karnataka",
        "district": "Bengaluru Urban",
        "city": "Bengaluru",
        "latitude": 12.9569,
        "longitude": 77.7011,
        "road_type": "Urban Arterial",
        "risk_score": 82,
        "risk_level": "CRITICAL"
    },
    {
        "id": 3,
        "name": "Mumbai Eastern Express Highway",
        "state": "Maharashtra",
        "district": "Mumbai Suburban",
        "city": "Mumbai",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "road_type": "State Highway",
        "risk_score": 76,
        "risk_level": "HIGH"
    },
    {
        "id": 4,
        "name": "Delhi Ring Road (Mukarba Chowk)",
        "state": "Delhi",
        "district": "North Delhi",
        "city": "New Delhi",
        "latitude": 28.7351,
        "longitude": 77.1611,
        "road_type": "National Highway",
        "risk_score": 84,
        "risk_level": "CRITICAL"
    },
    {
        "id": 5,
        "name": "Hyderabad IT Corridor (Gachibowli)",
        "state": "Telangana",
        "district": "Ranga Reddy",
        "city": "Hyderabad",
        "latitude": 17.4401,
        "longitude": 78.3489,
        "road_type": "Urban Express Corridor",
        "risk_score": 58,
        "risk_level": "MEDIUM"
    },
    {
        "id": 6,
        "name": "Kolkata Highway Junction (Kona Exp)",
        "state": "West Bengal",
        "district": "Howrah",
        "city": "Kolkata",
        "latitude": 22.5726,
        "longitude": 88.3639,
        "road_type": "National Highway Merge",
        "risk_score": 72,
        "risk_level": "HIGH"
    }
]

CAUSES = [
    "Overspeeding", "Poor Road Condition", "Poor Visibility",
    "Driver Distraction", "Drunk Driving", "Weather / Hydroplaning"
]

VEHICLES = [
    "Two-Wheelers", "Pedestrians", "Freight Trucks", "Cars / SUVs", "Buses"
]

def seed_db(db: Session):
    if db.query(Location).first():
        return # DB already seeded

    print("Seeding RoadSafe India Database...")

    # Seed User
    user = User(
        email="rajesh.sharma@roadsafe.gov.in",
        hashed_password=hash_password("password123"),
        name="Dr. Rajesh Sharma",
        role="AUTHORITY",
        department="Road Safety Intelligence Division"
    )
    db.add(user)

    # Seed Locations & Related Data
    for loc_data in INITIAL_LOCATIONS:
        loc = Location(
            id=loc_data["id"],
            name=loc_data["name"],
            state=loc_data["state"],
            district=loc_data["district"],
            city=loc_data["city"],
            latitude=loc_data["latitude"],
            longitude=loc_data["longitude"],
            road_type=loc_data["road_type"]
        )
        db.add(loc)
        db.flush()

        # Seed Risk Score
        risk = RiskScore(
            location_id=loc.id,
            score=loc_data["risk_score"],
            risk_level=loc_data["risk_level"],
            confidence=88
        )
        db.add(risk)

        # Seed Predictions
        pred7 = Prediction(
            location_id=loc.id,
            prediction_date=datetime.date.today().isoformat(),
            prediction_period="7d",
            predicted_risk=min(100, loc_data["risk_score"] + random.randint(2, 5)),
            confidence=87,
            trend="Increasing"
        )
        db.add(pred7)

        # Seed Interventions
        int1 = Intervention(
            location_id=loc.id,
            name="Intelligent Speed Enforcement (ANPR Radar Grid)",
            reason="Overspeeding is the dominant accident contributor at this location.",
            expected_reduction=28.0,
            estimated_cost="Medium",
            priority="Very High",
            confidence=88
        )
        int2 = Intervention(
            location_id=loc.id,
            name="Smart Solar Street Lighting & Reflector Delineators",
            reason="Inadequate nighttime illumination causes severe night crashes.",
            expected_reduction=18.0,
            estimated_cost="Low",
            priority="High",
            confidence=91
        )
        int3 = Intervention(
            location_id=loc.id,
            name="Pedestrian Skywalk & Grade Segregation",
            reason="High pedestrian volume crossing high-speed arterial lanes.",
            expected_reduction=32.0,
            estimated_cost="High",
            priority="High",
            confidence=94
        )
        db.add_all([int1, int2, int3])

        # Seed Historical Accidents
        for i in range(40):
            days_ago = random.randint(1, 300)
            acc_date = (datetime.date.today() - datetime.timedelta(days=days_ago)).isoformat()
            hour = random.choice([7, 8, 9, 17, 18, 19, 20, 21, 22, 2])
            acc_time = f"{hour:02d}:{random.randint(0, 59):02d}"

            fatalities = 1 if random.random() < 0.25 else 0
            injuries = random.randint(1, 3)

            acc = Accident(
                location_id=loc.id,
                date=acc_date,
                time=acc_time,
                vehicle_type=random.choice(VEHICLES),
                cause=random.choice(CAUSES),
                severity="Fatal" if fatalities > 0 else "Grievous",
                fatalities=fatalities,
                injuries=injuries
            )
            db.add(acc)

    db.commit()
    print("Database seeding completed cleanly!")
