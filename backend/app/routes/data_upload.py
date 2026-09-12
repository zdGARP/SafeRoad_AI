from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.data_ingestion import ingest_accident_csv, UPLOAD_LOGS

router = APIRouter(prefix="/data", tags=["Data Ingestion & CSV Upload"])

@router.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file type. Only CSV files are accepted.")
        
    content = await file.read()
    try:
        csv_text = content.decode("utf-8")
    except UnicodeDecodeError:
        csv_text = content.decode("latin-1")
        
    result = ingest_accident_csv(csv_text, filename=file.filename, db=db)
    return result

@router.get("/upload-history")
def get_upload_history():
    return UPLOAD_LOGS
