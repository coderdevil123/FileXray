from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "FileXray"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = (
        "Static Malware Analysis & File Triage Platform"
    )
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    class Config:
        env_file = ".env"

settings = Settings()