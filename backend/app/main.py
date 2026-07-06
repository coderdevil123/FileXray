from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.routes import router

from app.database.init_db import create_database


app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
)


@app.on_event("startup")
def startup():

    create_database()


app.include_router(
    router,
    prefix=settings.API_PREFIX
)


@app.get("/")
def root():

    return {
        "message":"Welcome to FileXray",
        "version":settings.VERSION
    }