"""Contract tests for core_logic package."""

from src.core_logic import FhirBundleResult
from src.core_logic import PrescriptionRequest
from src.core_logic import PrescriptionSafetyResult
from src.core_logic import SlotRequest
from src.core_logic import SlotResult
from src.core_logic import SoapNote
from src.core_logic import SpecialtyRecommendation
from src.core_logic import SymptomInput
from src.core_logic.symptom_mapper import map_symptom_to_specialty


def test_contracts_can_be_instantiated() -> None:
    symptom = SymptomInput(symptom="headache", patient_id="patient-123")
    recommendation = SpecialtyRecommendation(
        specialty="General Practice",
        department="CareNavigation",
        rationale="Symptom map match",
        source_symptom="headache",
        matched_cues=["headache"],
        confidence=0.6,
    )
    slot_request = SlotRequest(
        candidate_slots=["10:00", "10:30"],
        booked_slots=["10:00"],
    )
    slot_result = SlotResult(available_slots=["10:30"])
    soap_note = SoapNote(
        subjective="Headache for 2 days.",
        objective="No acute distress.",
        assessment="Likely tension headache.",
        plan="Hydration and follow-up.",
    )
    prescription = PrescriptionRequest(
        medication_name="Acetaminophen",
        dosage_text="500 mg",
        frequency_text="q8h prn",
        duration_text="3 days",
        rxnorm_code="161",
    )
    safety = PrescriptionSafetyResult(
        is_allowed=True,
        reason="General/non-controlled medication.",
        normalized_medication_name="acetaminophen",
    )
    fhir = FhirBundleResult(bundle={"resourceType": "Bundle"}, included_resource_types=["Consent"])

    assert symptom.symptom == "headache"
    assert recommendation.specialty == "General Practice"
    assert recommendation.confidence is not None
    assert slot_request.booked_slots == ["10:00"]
    assert slot_result.available_slots == ["10:30"]
    assert soap_note.subjective.startswith("Headache")
    assert prescription.medication_name == "Acetaminophen"
    assert safety.is_allowed is True
    assert fhir.bundle["resourceType"] == "Bundle"


def test_slot_request_defaults_are_explicit() -> None:
    request = SlotRequest(candidate_slots=[], booked_slots=[])

    assert request.candidate_slots == []
    assert request.booked_slots == []


def test_map_symptom_to_specialty_golden_path_headache() -> None:
    recommendation = map_symptom_to_specialty(SymptomInput(symptom="headache"))

    assert recommendation.specialty == "General Practice"
    assert recommendation.department == "Navigation"
    assert recommendation.source_symptom == "headache"
    assert "headache" in recommendation.matched_cues


def test_map_symptom_to_specialty_fallback_for_unknown_symptom() -> None:
    recommendation = map_symptom_to_specialty(SymptomInput(symptom="unknown symptom"))

    assert recommendation.specialty == "General Practice"
    assert recommendation.department == "Navigation"
    assert "fallback" in recommendation.rationale.lower()


def test_map_symptom_to_specialty_respects_injected_mapping() -> None:
    injected_rules = {
        "Internal Medicine": {
            "department": ("ClinicalSigner",),
            "cues": ("headache",),
        }
    }
    recommendation = map_symptom_to_specialty(
        SymptomInput(symptom="  HEADACHE  "),
        triage_rules=injected_rules,
    )

    assert recommendation.specialty == "Internal Medicine"
    assert recommendation.department == "ClinicalSigner"
    assert recommendation.source_symptom == "headache"


def test_map_symptom_to_specialty_routes_rash_and_itch_to_dermatology() -> None:
    recommendation = map_symptom_to_specialty(
        SymptomInput(symptom="I have itchy skin and rash on my arm"),
    )

    assert recommendation.specialty == "Dermatology"
    assert "rash" in recommendation.matched_cues


def test_map_symptom_to_specialty_routes_flank_kidney_text_to_nephrology() -> None:
    recommendation = map_symptom_to_specialty(
        SymptomInput(symptom="Severe flank pain with burning urination"),
    )

    assert recommendation.specialty == "Nephrology"
    assert any(cue in recommendation.matched_cues for cue in ("flank pain", "burning urination"))
