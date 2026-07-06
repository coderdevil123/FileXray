from fastapi import FastAPI


app = FastAPI(
    title="FileXray API",
    description="Static Malware Analysis & File Triage Platform",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "project": "FileXray",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }