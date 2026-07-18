from fastapi import APIRouter

router = APIRouter(
    tags=["Health"]
)

@router.get("/")
def health():
    return{
        "status":"healthy",
        "service":"FileXray",
        "version":"1.0.0"
    }