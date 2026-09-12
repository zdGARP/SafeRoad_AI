import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine, SessionLocal
from app.utils.seed import seed_db

# Import all routers
from app.routes.health import router as health_router
from app.routes.auth import router as auth_router
from app.routes.locations import router as locations_router
from app.routes.dashboard import router as dashboard_router
from app.routes.risk_map import router as risk_map_router
from app.routes.risk import router as risk_router
from app.routes.intelligence import router as intelligence_router
from app.routes.analytics import router as analytics_router
from app.routes.causes import router as causes_router
from app.routes.vulnerability import router as vulnerability_router
from app.routes.time_risk import router as time_risk_router
from app.routes.prediction import router as prediction_router
from app.routes.interventions import router as interventions_router
from app.routes.reports import router as reports_router
from app.routes.data_upload import router as data_upload_router

# Initialize FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Full-stack FastAPI backend API for RoadSafe India National Safety Portal",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
origins = settings.CORS_ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers under /api prefix
app.include_router(health_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(locations_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(risk_map_router, prefix="/api")
app.include_router(risk_router, prefix="/api")
app.include_router(intelligence_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(causes_router, prefix="/api")
app.include_router(vulnerability_router, prefix="/api")
app.include_router(time_risk_router, prefix="/api")
app.include_router(prediction_router, prefix="/api")
app.include_router(interventions_router, prefix="/api")
app.include_router(reports_router, prefix="/api")
app.include_router(data_upload_router, prefix="/api")

@app.on_event("startup")
def startup_event():
    # Initialize DB tables
    Base.metadata.create_all(bind=engine)
    
    # Auto-seed database if empty
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()

@app.get("/")
def root_redirect():
    return {
        "service": "RoadSafe India API",
        "status": "online",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
