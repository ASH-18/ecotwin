from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from api import router as engine_router
from model import model_instance
import os

app = FastAPI(
    title="EcoTwin-X AI Service",
    description="Digital Twin Engine for environmental behavior simulation",
    version="1.0.0"
)

# Apply CORS for seamless NextJS interactions
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect the simulation endpoints
app.include_router(engine_router, tags=["Engine"])

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Graceful JSON handler securely preventing tracebacks leaking to NextJS."""
    return JSONResponse(
        status_code=500,
        content={"message": "Internal AI Service Error", "detail": str(exc), "service": "EcoTwin-X Engine"}
    )

@app.get("/health", tags=["System"])
async def get_health():
    """System health check monitoring the availability of the AI models."""
    return {"status": "healthy", "model_loaded": model_instance.is_loaded}

@app.get("/", tags=["System"])
async def root():
    """Root redirect"""
    return {"message": "Welcome to EcoTwin-X AI Service"}
