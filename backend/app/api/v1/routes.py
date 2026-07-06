from fastapi import APIRouter


from app.api.v1.endpoints import scans


router = APIRouter()


router.include_router(
    scans.router,
    prefix="/scans",
    tags=["Scans"]
)


@router.get("/health")
def health():

    return {
        "status":"healthy",
        "service":"FileXray API"
    }