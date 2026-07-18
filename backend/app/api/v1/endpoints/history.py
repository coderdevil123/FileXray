from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_database
from app.models.scan import Scan

router = APIRouter(
    tags=["History"]
)

@router.get("/")
def get_history(
    database: Session = Depends(get_database)
):
    scans = (
        database.query(Scan)
        .order_by(Scan.created_at.desc())
        .limit(10)
        .all()
    )

    history = []

    for scan in scans:
        history.append({
            "id": scan.id,
            "filename": scan.filename,
            "file_hash": scan.file_hash,
            "file_type": scan.file_type,
            "risk_score": scan.risk_score,
            "risk_level": scan.risk_level,
            "created_at": scan.created_at,
            "analysis_result": scan.analysis_result,
        })

    return history