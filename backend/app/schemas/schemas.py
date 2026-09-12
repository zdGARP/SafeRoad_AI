import datetime
from typing import List, Optional, Any
from pydantic import BaseModel, EmailStr

# Location Schemas
class LocationBase(BaseModel):
    name: str
    state: str
    district: str
    city: str
    latitude: float
    longitude: float
    road_type: str

class LocationCreate(LocationBase):
    pass

class LocationResponse(LocationBase):
    id: int
    accidents: Optional[int] = 0
    fatalities: Optional[int] = 0
    injuries: Optional[int] = 0
    risk_score: Optional[int] = 50
    risk_level: Optional[str] = "MEDIUM"

    class Config:
        from_attributes = True

# Accident Schemas
class AccidentBase(BaseModel):
    location_id: int
    date: str
    time: str
    vehicle_type: str
    cause: str
    severity: str
    fatalities: int
    injuries: int

class AccidentCreate(AccidentBase):
    pass

class AccidentResponse(AccidentBase):
    id: int

    class Config:
        from_attributes = True

# Risk Schemas
class RiskScoreResponse(BaseModel):
    id: int
    location_id: int
    score: int
    risk_level: str
    confidence: int
    calculated_at: datetime.datetime

    class Config:
        from_attributes = True

# Prediction Schemas
class PredictionResponse(BaseModel):
    location_id: int
    prediction_period: str
    current_risk: int
    predicted_risk: int
    confidence: int
    trend: str
    historical_vs_predicted: List[Any]

# Intervention Schemas
class InterventionResponse(BaseModel):
    id: int
    location_id: int
    name: str
    reason: str
    expected_reduction: float
    estimated_cost: str
    priority: str
    confidence: int

    class Config:
        from_attributes = True

class SimulationRequest(BaseModel):
    location_id: int
    selected_interventions: List[str]

class SimulationResponse(BaseModel):
    location_id: int
    current_accidents: int
    predicted_accidents: int
    estimated_reduction: float
    ranked_interventions: List[Any]
    safety_benefit: str

# User & Auth Schemas
class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Any

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    department: str

    class Config:
        from_attributes = True
