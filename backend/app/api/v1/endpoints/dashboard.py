from fastapi import APIRouter
from sqlalchemy import func
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.session import get_database
from app.models.scan import Scan

router = APIRouter()

@router.get("/stats")
def dashboard_stats(
    database: Session = Depends(get_database)
):

    total = database.query(Scan).count()

    latest = (
        database.query(Scan)
        .order_by(Scan.id.desc())
        .first()
    )

    return {
        "files_scanned": total,
        "latest_risk": latest.risk_level if latest else "SAFE",
        "reports": total,
    }