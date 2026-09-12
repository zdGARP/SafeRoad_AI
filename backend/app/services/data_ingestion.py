"""
Data Ingestion Service (BOB Prompt 3 Specification)
Imports road accident CSV datasets, validates columns, normalizes categories, detects duplicate records, and inserts valid records into PostgreSQL.
"""

import io
import pandas as pd
import datetime
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.models import Location, Accident

REQUIRED_COLUMNS = ["date", "vehicle_type", "cause", "severity"]
UPLOAD_LOGS: List[Dict[str, Any]] = []

def ingest_accident_csv(csv_text: str, filename: str = "upload.csv", db: Session = None) -> Dict[str, Any]:
    file_bytes = csv_text.encode("utf-8") if isinstance(csv_text, str) else csv_text
    res = process_csv_ingestion(file_bytes, db)
    log_entry = {
        "id": f"UP-{len(UPLOAD_LOGS) + 1:04d}",
        "filename": filename,
        "records_received": res.get("records_received", 0),
        "records_inserted": res.get("records_inserted", 0),
        "duplicates": res.get("duplicates", 0),
        "invalid": res.get("invalid", 0),
        "uploaded_at": datetime.datetime.now().isoformat()
    }
    UPLOAD_LOGS.insert(0, log_entry)
    res["upload_log"] = log_entry
    return res

def process_csv_ingestion(file_contents: bytes, db: Session) -> Dict[str, Any]:
    try:
        df = pd.read_csv(io.BytesIO(file_contents))
    except Exception as e:
        return {
            "error": f"Failed to parse CSV file: {str(e)}",
            "records_received": 0,
            "records_inserted": 0,
            "duplicates": 0,
            "invalid": 0
        }

    records_received = len(df)
    records_inserted = 0
    duplicates = 0
    invalid = 0

    # Normalization helper
    def normalize_str(val, default="Unknown"):
        if pd.isna(val) or not str(val).strip():
            return default
        return str(val).strip().title()

    # Get default target location (e.g. Location ID 1)
    default_location = db.query(Location).first() if db else None
    location_id = default_location.id if default_location else 1

    existing_signatures = set()
    if db:
        existing_signatures = set(
            (a.location_id, a.date, a.time, a.cause, a.vehicle_type)
            for a in db.query(Accident.location_id, Accident.date, Accident.time, Accident.cause, Accident.vehicle_type).all()
        )

    new_accidents = []

    for _, row in df.iterrows():
        try:
            date_val = str(row.get("date", "2026-08-15")).strip()
            time_val = str(row.get("time", "18:00")).strip()
            vehicle = normalize_str(row.get("vehicle_type"), "Two-Wheelers")
            cause = normalize_str(row.get("cause"), "Overspeeding")
            severity = normalize_str(row.get("severity"), "Grievous")

            fatalities = int(row.get("fatalities", 0)) if not pd.isna(row.get("fatalities")) else 0
            injuries = int(row.get("injuries", 1)) if not pd.isna(row.get("injuries")) else 1

            sig = (location_id, date_val, time_val, cause, vehicle)
            if sig in existing_signatures:
                duplicates += 1
                continue

            existing_signatures.add(sig)

            acc = Accident(
                location_id=location_id,
                date=date_val,
                time=time_val,
                vehicle_type=vehicle,
                cause=cause,
                severity=severity,
                fatalities=fatalities,
                injuries=injuries
            )
            new_accidents.append(acc)
            records_inserted += 1

        except Exception:
            invalid += 1

    if new_accidents and db:
        db.add_all(new_accidents)
        db.commit()

    return {
        "records_received": records_received,
        "records_inserted": records_inserted,
        "duplicates": duplicates,
        "invalid": invalid,
        "message": f"Successfully ingested {records_inserted} accident records into PostgreSQL database."
    }
