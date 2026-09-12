import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    state = Column(String(100), nullable=False, index=True)
    district = Column(String(100), nullable=False, index=True)
    city = Column(String(100), nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    road_type = Column(String(100), nullable=False, index=True)

    # Relationships
    accidents = relationship("Accident", back_populates="location", cascade="all, delete-orphan")
    risk_scores = relationship("RiskScore", back_populates="location", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="location", cascade="all, delete-orphan")
    interventions = relationship("Intervention", back_populates="location", cascade="all, delete-orphan")
    simulations = relationship("SimulationResult", back_populates="location", cascade="all, delete-orphan")

class Accident(Base):
    __tablename__ = "accidents"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    date = Column(String(20), nullable=False, index=True) # YYYY-MM-DD
    time = Column(String(10), nullable=False) # HH:MM
    vehicle_type = Column(String(100), nullable=False, index=True)
    cause = Column(String(150), nullable=False, index=True)
    severity = Column(String(50), nullable=False, index=True) # Fatal, Grievous, Minor
    fatalities = Column(Integer, default=0)
    injuries = Column(Integer, default=0)

    location = relationship("Location", back_populates="accidents")

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    score = Column(Integer, nullable=False) # 0-100
    risk_level = Column(String(50), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    confidence = Column(Integer, default=85) # 0-100%
    calculated_at = Column(DateTime, default=datetime.datetime.utcnow)

    location = relationship("Location", back_populates="risk_scores")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    prediction_date = Column(String(20), nullable=False)
    prediction_period = Column(String(20), nullable=False) # 7d, 30d, 90d
    predicted_risk = Column(Integer, nullable=False)
    confidence = Column(Integer, default=85)
    trend = Column(String(50), nullable=False) # Increasing, Decreasing, Stable

    location = relationship("Location", back_populates="predictions")

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    name = Column(String(255), nullable=False)
    reason = Column(Text, nullable=False)
    expected_reduction = Column(Float, nullable=False) # e.g. 28.0%
    estimated_cost = Column(String(50), nullable=False) # Low, Medium, High
    priority = Column(String(50), nullable=False) # Very High, High, Medium
    confidence = Column(Integer, default=88)

    location = relationship("Location", back_populates="interventions")

class SimulationResult(Base):
    __tablename__ = "simulation_results"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey("locations.id"), nullable=False)
    selected_interventions = Column(JSON, nullable=False)
    current_accidents = Column(Integer, nullable=False)
    predicted_accidents = Column(Integer, nullable=False)
    estimated_reduction = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    location = relationship("Location", back_populates="simulations")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    role = Column(String(50), default="ANALYST") # ADMIN, AUTHORITY, ANALYST
    department = Column(String(255), default="Road Safety Division")
    is_active = Column(Boolean, default=True)
