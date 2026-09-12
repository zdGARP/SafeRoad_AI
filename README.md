# Road Safety Prediction System

A predictive intelligence system designed to prevent road accidents in India by analyzing accident patterns and identifying high-risk areas before tragedies occur.

## Product Vision

Create a future where road fatalities become rare exceptions through predictive intelligence, making Indian roads among the world's safest by preventing accidents before they occur rather than responding after tragedies.

## Target Audience

**Primary Users:**
- Traffic authority officials
- Urban infrastructure planners
- Policymakers

**Secondary Users:**
- Insurance companies
- Navigation app providers
- Urban development teams

## Core Features

- **CRUD Operations**: Complete accident record management
  - Create new accident records with detailed information
  - Read and search accident records with filtering
  - Update existing accident records
  - Delete accident records

## Technology Stack

- **Backend Framework**: FastAPI 0.104.1
- **Database**: SQLite with SQLAlchemy ORM
- **Data Validation**: Pydantic 2.5.0
- **Server**: Uvicorn with standard extras
- **Architecture**: Modular Monolith

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. **Clone or navigate to the project directory**

2. **Create a virtual environment**
```bash
python -m venv venv
```

3. **Activate the virtual environment**

On Linux/Mac:
```bash
source venv/bin/activate
```

On Windows:
```bash
venv\Scripts\activate
```

4. **Install dependencies**
```bash
pip install -r backend/requirements.txt
```

5. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file and update the configuration values as needed, especially:
- `SECRET_KEY`: Use a strong random string in production
- `DATABASE_URL`: Update if using a different database

## Running the Application

### Development Mode

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at: `http://localhost:8000`

### Production Mode

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the application is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Health Check
- `GET /` - Root endpoint with API information
- `GET /health` - Health check endpoint

### Accident Records
- `POST /api/v1/accidents` - Create a new accident record
- `GET /api/v1/accidents` - List accident records (with pagination and filtering)
- `GET /api/v1/accidents/{accident_id}` - Get a specific accident record
- `PUT /api/v1/accidents/{accident_id}` - Update an accident record
- `DELETE /api/v1/accidents/{accident_id}` - Delete an accident record

### Query Parameters for Listing
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 10, max: 100)
- `location`: Filter by location (partial match)
- `severity`: Filter by severity level (low, medium, high, critical)

## Database Schema

### AccidentRecord Table
- `id`: Primary key
- `location`: Accident location (string)
- `latitude`: Geographic latitude (-90 to 90)
- `longitude`: Geographic longitude (-180 to 180)
- `date_time`: Date and time of accident
- `severity`: Severity level (low, medium, high, critical)
- `weather_condition`: Weather at time of accident
- `road_condition`: Road condition
- `traffic_density`: Traffic density level
- `vehicle_type`: Type of vehicle involved
- `casualties`: Number of casualties
- `injuries`: Number of injuries
- `description`: Detailed description
- `risk_score`: Calculated risk score (0-100)
- `predicted`: Flag for predicted vs actual (0=actual, 1=predicted)
- `created_at`: Record creation timestamp
- `updated_at`: Record update timestamp

## Project Structure

```
.
├── backend/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── requirements.txt     # Python dependencies
│   └── routers/
│       ├── __init__.py
│       └── accidents.py     # Accident CRUD endpoints
├── .env.example             # Environment variables template
└── README.md               # This file
```

## Architecture Overview

The application follows a **Modular Monolith** architecture with clear separation of concerns:

- **Routers**: Handle HTTP requests and responses
- **Schemas**: Define data validation and serialization
- **Models**: Define database structure
- **Database**: Manage database connections and sessions
- **Config**: Centralize configuration management

## Security Features

- Input validation using Pydantic schemas
- SQL injection prevention through SQLAlchemy ORM
- CORS configuration for cross-origin requests
- Environment-based configuration (no hardcoded secrets)
- Structured logging for monitoring

## Development Guidelines

1. Always validate input data using Pydantic schemas
2. Use proper error handling and logging
3. Follow RESTful API conventions
4. Keep database sessions properly managed
5. Update environment variables for sensitive data

## Future Enhancements

- Machine learning models for accident prediction
- Real-time data integration
- Geographic visualization dashboard
- Advanced analytics and reporting
- Mobile application integration
- Multi-language support

## Support

For issues, questions, or contributions, please contact the development team or refer to the project documentation.

## License

Copyright © 2026 Road Safety Prediction System. All rights reserved.
