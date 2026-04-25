from typing import Literal

from pydantic import BaseModel, Field


class FHIRBundle(BaseModel):
    data: dict = Field(..., description="FHIR Bundle or resource payload")


class News2Subscores(BaseModel):
    respiratory_rate: int | None = None
    spo2: int | None = None
    supplemental_o2: int | None = None
    systolic_bp: int | None = None
    heart_rate: int | None = None
    consciousness: int | None = None
    temperature: int | None = None


class News2Result(BaseModel):
    score: int | None
    risk: Literal[
        "low",
        "low_medium",
        "medium",
        "high",
        "critical",
        "insufficient_data",
    ]
    subscores: News2Subscores
    spo2_scale_used: int | None
    missing_parameters: list[
        Literal[
            "respiratory_rate",
            "spo2",
            "supplemental_o2",
            "systolic_bp",
            "heart_rate",
            "consciousness",
            "temperature",
        ]
    ]
    reason: str
    actions: list[str]
    data_confidence: Literal["complete", "partial", "insufficient"]


class News2Response(BaseModel):
    news2: News2Result
