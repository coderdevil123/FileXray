from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)


from sqlalchemy.orm import Session


from app.database.session import get_database
from app.models.scan import Scan
from app.schemas.scan import ScanResponse

from app.utils.file_handler import save_uploaded_file


router = APIRouter()


@router.post(
    "/upload",
    response_model=ScanResponse
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


    scan = Scan(

        filename=file.filename,

        file_type=file.content_type,

        report_path=file_path

    )


    database.add(scan)

    database.commit()

    database.refresh(scan)


    return scan