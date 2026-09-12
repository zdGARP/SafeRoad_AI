from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional
from backend.models import SeverityLevel


class AccidentBase(BaseModel):
    """Base schema for accident records"""
    location: str = Field(..., min_length=1, max_length=255)
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    date_time: datetime
    severity: SeverityLevel
    weather_condition: Optional[str] = Field(None, max_length=100)
    road_condition: Optional[str] = Field(None, max_length=100)
    traffic_density: Optional[str] = Field(None, max_length=50)
    vehicle_type: Optional[str] = Field(None, max_length=100)
    casualties: int = Field(default=0, ge=0)
    injuries: int = Field(default=0, ge=0)
    description: Optional[str] = None
    risk_score: Optional[float] = Field(None, ge=0, le=100)


class AccidentCreate(AccidentBase):
    """Schema for creating accident records"""
    pass


class AccidentUpdate(BaseModel):
    """Schema for updating accident records"""
    location: Optional[str] = Field(None, min_length=1, max_length=255)
    latitude: Optional[float] = Field(None, ge=-90, le=90)
    longitude: Optional[float] = Field(None, ge=-180, le=180)
    date_time: Optional[datetime] = None
    severity: Optional[SeverityLevel] = None
    weather_condition: Optional[str] = Field(None, max_length=100)
    road_condition: Optional[str] = Field(None, max_length=100)
    traffic_density: Optional[str] = Field(None, max_length=50)
    vehicle_type: Optional[str] = Field(None, max_length=100)
    casualties: Optional[int] = Field(None, ge=0)
    injuries: Optional[int] = Field(None, ge=0)
    description: Optional[str] = None
    risk_score: Optional[float] = Field(None, ge=0, le=100)


class AccidentResponse(AccidentBase):
    """Schema for accident record responses"""
    id: int
    predicted: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class AccidentListResponse(BaseModel):
    """Schema for paginated accident list responses"""
    total: int
    page: int
    page_size: int
    data: list[AccidentResponse]
