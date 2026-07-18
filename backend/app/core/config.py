from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "FileXray"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "Static Malware Analysis & File Triage Platform"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    MAX_FILE_SIZE: int = 104857600
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env"
    )

settings = Settings()