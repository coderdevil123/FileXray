from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app.reports.report_builder import ReportBuilder
from app.database.session import get_database
from app.models.scan import Scan
from app.reports.report_engine import ReportEngine
from fastapi.responses import FileResponse
from fastapi import HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter()

@router.get("/download/{filename}")
def download_report(filename:str):
    path=os.path.join(
        "reports",
        filename
    )
    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="Report not found."
        )
    return FileResponse(
        path=path,
        filename=filename
    )

@router.post("/generate/{scan_id}")
def generate_report(
    scan_id: int,
    format: str = "json",
    database: Session = Depends(get_database)
):

    scan = database.get(Scan, scan_id)

    if scan is None:
        return {
            "success": False,
            "message": "Scan not found."
        }
    engine = ReportEngine()
    builder = ReportBuilder()
    report = builder.build(scan)
    path = engine.generate(
        analysis=report,
        format=format
    )
    filename=os.path.basename(path)

    return {
        "success":True,
        "filename":filename,
        "download_url":f"/api/v1/reports/download/{filename}"
    }