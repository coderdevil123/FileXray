from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)

from app.services.analysis_pipeline import AnalysisPipeline
from app.schemas.analysis import AnalysisResponse
from app.schemas.scan import ScanResponse
from sqlalchemy.orm import Session
from app.database.session import get_database
from app.models.scan import Scan

from app.utils.file_handler import save_uploaded_file

router = APIRouter()

@router.post(
    "/upload",
    response_model=AnalysisResponse
)
def upload_file(

    file: UploadFile = File(...),

    database: Session = Depends(
        get_database
    )

):

    file_path = save_uploaded_file(
        file
    )
    pipeline = AnalysisPipeline()
    analysis_result = pipeline.run(file_path)

    analysis = AnalysisPipeline().run(file_path)

    scan = Scan(
        filename=file.filename,
        file_hash=analysis["analysis"]["hash"]["data"]["sha256"],
        file_type=file.content_type,
        risk_score=analysis["risk"]["score"],
        risk_level=analysis["risk"]["level"],
        report_path=file_path
    )

    database.add(scan)
    database.commit()
    database.refresh(scan)

    return {
        "success": True,
        "message": "Analysis completed successfully.",
        "data": {
            "scan": scan,
            "analysis": analysis
        }
    }
    print(analysis_result)

    return scan