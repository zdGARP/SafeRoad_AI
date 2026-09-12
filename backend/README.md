# RoadSafe India — FastAPI REST Backend

AI-Powered Road Safety Intelligence Platform Backend API.

## Tech Stack
- **Framework**: FastAPI + Uvicorn
- **ORM & DB**: SQLAlchemy + PostgreSQL (Auto-falls back to SQLite if PostgreSQL URL is unset)
- **Validation**: Pydantic v2
- **Auth**: PyJWT + Passlib (PBKDF2/Bcrypt)
- **ML**: Scikit-Learn + Pandas + NumPy

## Quick Start

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Access Interactive API Documentation (Swagger UI):
- `http://localhost:8000/docs`
- Health check: `http://localhost:8000/api/health`
