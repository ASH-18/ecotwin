from fastapi import APIRouter
from schemas import (
    PredictCarbonRequest, 
    PredictCarbonResponse,
    SimulateImpactRequest,
    SimulateImpactResponse,
    VerifyActionRequest,
    VerifyActionResponse
)
from model import model_instance

router = APIRouter()

@router.post("/predict-carbon", response_model=PredictCarbonResponse)
async def predict_carbon(request: PredictCarbonRequest):
    predicted = await model_instance.predict_emissions({
        "current_emissions": request.current_emissions,
        "energy_usage": request.energy_usage
    })
    return PredictCarbonResponse(
        predicted_emissions=predicted,
        model_version="v0.1-placeholder"
    )

@router.post("/simulate-impact", response_model=SimulateImpactResponse)
async def simulate_impact(request: SimulateImpactRequest):
    modifiers = [mod.model_dump() for mod in request.active_modifiers]
    result = await model_instance.simulate_impact(
        twin_id=request.twin_id,
        active_modifiers=modifiers
    )
    return SimulateImpactResponse(
        forecast_30d_reduction=result["forecast_30d_reduction"],
        generated_recommendations=result["generated_recommendations"]
    )

@router.post("/verify-action", response_model=VerifyActionResponse)
async def verify_action(request: VerifyActionRequest):
    """
    Ingest evidence, run ML models for OCR/CV, check pHash deduplication, 
    and emit a final Trust Score for the ledger.
    """
    result = await model_instance.verify_evidence(
        evidence_payload=request.evidence_payload,
        previous_hash=request.previous_hash
    )
    
    return VerifyActionResponse(
        verification_id=request.verification_id,
        trust_score=result["trust_score"],
        media_hash_signature=result["media_hash_signature"],
        is_duplicate=result["is_duplicate"]
    )
