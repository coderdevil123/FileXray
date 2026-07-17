from fastapi import APIRouter
from app.api.v1.endpoints import dashboard
from app.api.v1.endpoints import scans
from app.api.v1.endpoints import history

router = APIRouter()

router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

router.include_router(
    scans.router,
    prefix="/scans",
    tags=["Scans"]
)

router.include_router(
    history.router,
    prefix="/history",
    tags=["History"],
)

@router.get("/health")
def health():

    return {
        "status":"healthy",
        "service":"FileXray API"
    }