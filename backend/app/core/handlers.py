from fastapi import Request
from fastapi.responses import JSONResponse
from app.core.exceptions import FileXrayException

async def filexray_exception_handler(
    request: Request,
    exc: FileXrayException
):
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": str(exc)
        }
    )