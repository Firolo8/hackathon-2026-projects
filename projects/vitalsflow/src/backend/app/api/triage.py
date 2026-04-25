from fastapi import APIRouter, HTTPException

from app.schemas.triage import FHIRBundle, News2Response
from app.services.triage_service import triage_from_fhir

router = APIRouter()


@router.post("/", response_model=News2Response)
async def triage(request: FHIRBundle) -> News2Response:
    try:
        return triage_from_fhir(request.data)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
