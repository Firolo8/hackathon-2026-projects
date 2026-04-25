import logging

from app.ai.llm_triage import generate_news2_llm
from app.core.config import settings
from app.schemas.triage import News2Response
from app.services.news2 import calculate_news2
from app.utils.fhir import extract_vitals

logger = logging.getLogger(__name__)


def triage_from_fhir(fhir_data: dict) -> News2Response:
    vitals = extract_vitals(fhir_data)
    deterministic = calculate_news2(vitals)

    if settings.use_llm and settings.gemini_api_key:
        try:
            llm_response = generate_news2_llm(fhir_data)
            if _is_consistent(llm_response, deterministic):
                return llm_response
            logger.warning("LLM response inconsistent with deterministic scoring.")
        except Exception as exc:  # noqa: BLE001
            logger.warning("LLM triage failed: %s", exc)

    return deterministic


def _is_consistent(llm_response: News2Response, deterministic: News2Response) -> bool:
    det = deterministic.news2
    llm = llm_response.news2
    if det.score is None:
        return False
    if llm.score != det.score:
        return False
    if llm.subscores.model_dump() != det.subscores.model_dump():
        return False
    if llm.risk != det.risk:
        return False
    if llm.spo2_scale_used != det.spo2_scale_used:
        return False
    return True
