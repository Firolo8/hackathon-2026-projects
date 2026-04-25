from fastapi import FastAPI

from app.api.router import api_router
from app.core.config import settings
from app.core.logging import setup_logging

setup_logging(settings.log_level)

app = FastAPI(
    title="VitalsFlow API",
    version="0.1.0",
)


@app.get("/")
def root() -> dict:
    return {"status": "API running"}


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


app.include_router(api_router)
