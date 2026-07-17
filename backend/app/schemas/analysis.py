from typing import Any
from pydantic import BaseModel
from app.schemas.scan import ScanResponse

class AnalysisData(BaseModel):
    scan: ScanResponse
    analysis: dict[str, Any]

class AnalysisResponse(BaseModel):
    success: bool
    message: str
    data: AnalysisData