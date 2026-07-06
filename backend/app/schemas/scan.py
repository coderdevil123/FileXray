from pydantic import BaseModel
from datetime import datetime


class ScanResponse(BaseModel):

    id: int

    filename: str

    file_hash: str | None

    file_type: str | None

    risk_score: float

    risk_level: str

    created_at: datetime


    class Config:

        from_attributes = True