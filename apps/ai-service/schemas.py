from pydantic import BaseModel, Field
from typing import List, Optional

class ModifierSchema(BaseModel):
    type: str = Field(..., description="Action type, e.g., SOLAR_INSTALLATION")
    trust_score: float = Field(1.0, description="Confidence score from cryptographic or heuristic checks (0.0 - 1.0)")
    age_days: Optional[int] = Field(0, description="Age of the modifier, used for fidelity decay")

class PredictCarbonRequest(BaseModel):
    twin_id: str
    current_emissions: float = Field(..., description="Current baseline carbon footprint")
    energy_usage: float = Field(..., description="Recent instantaneous energy consumption in kWh")

class PredictCarbonResponse(BaseModel):
    predicted_emissions: float
    model_version: str

class SimulateImpactRequest(BaseModel):
    twin_id: str
    active_modifiers: List[ModifierSchema]

class RecommendationSchema(BaseModel):
    type: str
    potential_impact: float
    reason: str = "Optimization identified by AI"

class SimulateImpactResponse(BaseModel):
    forecast_30d_reduction: float
    generated_recommendations: List[RecommendationSchema]

class VerifyActionRequest(BaseModel):
    verification_id: str
    evidence_payload: str
    previous_hash: str

class VerifyActionResponse(BaseModel):
    verification_id: str
    trust_score: float
    media_hash_signature: str
    is_duplicate: bool
