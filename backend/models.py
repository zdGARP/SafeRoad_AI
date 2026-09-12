from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Enum
from sqlalchemy.sql import func
from datetime import datetime
import enum

from backend.database import Base


class SeverityLevel(str, enum.Enum):
    """Accident severity levels"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AccidentRecord(Base):
    """Model for storing accident records and predictions"""
    __tablename__ = "accident_records"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(255), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    date_time = Column(DateTime, nullable=False, index=True)
    severity = Column(Enum(SeverityLevel), nullable=False)
    weather_condition = Column(String(100))
    road_condition = Column(String(100))
    traffic_density = Column(String(50))
    vehicle_type = Column(String(100))
    casualties = Column(Integer, default=0)
    injuries = Column(Integer, default=0)
    description = Column(Text)
    risk_score = Column(Float)
    predicted = Column(Integer, default=0)  # 0 for actual, 1 for predicted
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    def __repr__(self):
        return f"<AccidentRecord(id={self.id}, location={self.location}, severity={self.severity})>"
