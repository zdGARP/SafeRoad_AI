from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
import logging

from backend.database import get_db
from backend.models import AccidentRecord
from backend.schemas import AccidentCreate, AccidentUpdate, AccidentResponse, AccidentListResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/accidents", response_model=AccidentResponse, status_code=201)
async def create_accident(
    accident: AccidentCreate,
    db: Session = Depends(get_db)
):
    """Create a new accident record"""
    try:
        db_accident = AccidentRecord(**accident.model_dump())
        db.add(db_accident)
        db.commit()
        db.refresh(db_accident)
        logger.info(f"Created accident record: {db_accident.id}")
        return db_accident
    except Exception as e:
        db.rollback()
        logger.error(f"Error creating accident record: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create accident record")


@router.get("/accidents", response_model=AccidentListResponse)
async def list_accidents(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    location: Optional[str] = None,
    severity: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """List accident records with pagination and filtering"""
    try:
        query = db.query(AccidentRecord)
        
        # Apply filters
        if location:
            query = query.filter(AccidentRecord.location.ilike(f"%{location}%"))
        if severity:
            query = query.filter(AccidentRecord.severity == severity)
        
        # Get total count
        total = query.count()
        
        # Apply pagination
        offset = (page - 1) * page_size
        accidents = query.order_by(AccidentRecord.date_time.desc()).offset(offset).limit(page_size).all()
        
        return AccidentListResponse(
            total=total,
            page=page,
            page_size=page_size,
            data=accidents
        )
    except Exception as e:
        logger.error(f"Error listing accidents: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve accident records")


@router.get("/accidents/{accident_id}", response_model=AccidentResponse)
async def get_accident(
    accident_id: int,
    db: Session = Depends(get_db)
):
    """Get a specific accident record by ID"""
    accident = db.query(AccidentRecord).filter(AccidentRecord.id == accident_id).first()
    if not accident:
        raise HTTPException(status_code=404, detail="Accident record not found")
    return accident


@router.put("/accidents/{accident_id}", response_model=AccidentResponse)
async def update_accident(
    accident_id: int,
    accident_update: AccidentUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing accident record"""
    try:
        db_accident = db.query(AccidentRecord).filter(AccidentRecord.id == accident_id).first()
        if not db_accident:
            raise HTTPException(status_code=404, detail="Accident record not found")
        
        # Update only provided fields
        update_data = accident_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_accident, field, value)
        
        db.commit()
        db.refresh(db_accident)
        logger.info(f"Updated accident record: {accident_id}")
        return db_accident
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error updating accident record: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update accident record")


@router.delete("/accidents/{accident_id}", status_code=204)
async def delete_accident(
    accident_id: int,
    db: Session = Depends(get_db)
):
    """Delete an accident record"""
    try:
        db_accident = db.query(AccidentRecord).filter(AccidentRecord.id == accident_id).first()
        if not db_accident:
            raise HTTPException(status_code=404, detail="Accident record not found")
        
        db.delete(db_accident)
        db.commit()
        logger.info(f"Deleted accident record: {accident_id}")
        return None
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"Error deleting accident record: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete accident record")
