from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.schemas.scan import ScanResponse
from app.database.session import get_database
from app.models.scan import Scan
from app.schemas.analysis import AnalysisResponse
from app.services.analysis_pipeline import AnalysisPipeline
from app.utils.file_handler import save_uploaded_file

router = APIRouter()


@router.post(
    "/upload",
    response_model=AnalysisResponse
)
def upload_file(
    file: UploadFile = File(...),
    database: Session = Depends(get_database)
):
    file_path = save_uploaded_file(file)

    analysis_pipeline = AnalysisPipeline()
    analysis = analysis_pipeline.run(file_path)

    scan = Scan(
        filename=file.filename,
        file_hash=analysis["analysis"]["hash"]["data"]["sha256"],
        file_type=file.content_type,
        risk_score=analysis["risk"]["score"],
        risk_level=analysis["risk"]["level"],
        report_path=file_path,
        analysis_result=analysis
    )

    database.add(scan)
    database.commit()
    database.refresh(scan)
    scan_response = ScanResponse.model_validate(scan)

    return {
        "success": True,
        "message": "Analysis completed successfully.",
        "data": {
            "scan": scan_response,
            "analysis": analysis
        }
    }