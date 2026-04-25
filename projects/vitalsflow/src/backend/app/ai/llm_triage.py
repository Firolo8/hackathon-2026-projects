import json

from app.ai.client import get_gemini_model
from app.ai.prompts import build_news2_prompt
from app.schemas.triage import News2Response


def generate_news2_llm(fhir_data: dict) -> News2Response:
    model = get_gemini_model()
    if model is None:
        raise RuntimeError("GEMINI_API_KEY not configured.")

    prompt = build_news2_prompt(fhir_data)
    response = model.generate_content(
        prompt,
        generation_config={"temperature": 0.2},
    )
    text = response.text or ""

    try:
        payload = json.loads(text)
    except json.JSONDecodeError as exc:
        raise ValueError("LLM returned invalid JSON.") from exc

    return News2Response.model_validate(payload)
