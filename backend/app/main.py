from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.routes import router
from app.database.init_db import create_database
from app.core.handlers import filexray_exception_handler
from app.core.exceptions import FileXrayException
from fastapi.middleware.cors import CORSMiddleware
from app.core.exceptions import register_exception_handlers
app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

register_exception_handlers(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    FileXrayException,
    filexray_exception_handler
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