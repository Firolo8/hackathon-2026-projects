import google.generativeai as genai

from app.core.config import settings

_model = None


def get_gemini_model():
    global _model
    if _model is not None:
        return _model
    if not settings.gemini_api_key:
        return None
    genai.configure(api_key=settings.gemini_api_key)
    _model = genai.GenerativeModel(settings.gemini_model)
    return _model
