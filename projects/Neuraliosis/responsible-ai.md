# Responsible AI for Neuraliosis

Neuraliosis is an AI-assisted health product, so responsible AI handling is part of the core design rather than an optional policy layer.

## Purpose of the AI

The AI in this project is used to:

- collect symptoms through conversational questioning
- narrow down likely concerns using follow-up prompts
- summarize health information into readable reports
- suggest common OTC products when symptoms appear low risk
- route users toward doctors or appointments when escalation is appropriate

The AI should support decision-making, not replace medical professionals.

## Safety Boundaries

The system should avoid presenting itself as a diagnostic authority. It must not claim certainty, and it should not tell users to ignore severe symptoms or avoid professional care.

High-risk or urgent symptoms should trigger a clear escalation path that recommends immediate medical attention or emergency services when appropriate.

## Data Use

The project handles sensitive health-related inputs, so data collection and storage should be minimized to what is needed for the feature being used.

Recommended practices:

- collect only symptom and context details needed for triage
- avoid retaining unnecessary personal data in prompts or logs
- separate user identity data from conversation or health content where possible
- protect stored records with access control and encryption

## Data Sources

The AI and RAG workflow in this project should rely on curated health information sources that are readable, public, and medically oriented.

Current project data sources include:

- MedlinePlus topic pages scraped into the local RAG corpus for fitness, nutrition, sleep, heart disease, anxiety, and pain guidance
- CDC pages for physical activity and healthy eating guidance
- MedlinePlus Magazine articles for broader consumer health education
- `src/ai/data/medical_dataset.json` as the project knowledge base for structured symptom and guidance content
- locally seeded app data in the Django backend for demo appointments, reports, doctors, medicines, and order history

These sources should be treated as supporting context only. They are useful for retrieval, summaries, and user guidance, but they are not a substitute for clinical diagnosis or emergency care.

## Fairness and Reliability

The AI should be tested across different symptom descriptions, ages, and user styles so that the output is not overly biased toward one kind of user input.

The system should also handle uncertainty explicitly. When the model does not have enough confidence, it should ask another question or recommend a human review instead of guessing.

## Human Oversight

Neuraliosis should keep a human-in-the-loop path for any output that is:

- clinically sensitive
- legally sensitive
- ambiguous or low confidence
- part of a doctor recommendation or appointment escalation flow

## User Messaging

Any AI-facing screen should include a plain-language disclaimer that the app is providing guidance, not a formal diagnosis.

The language should be calm and direct, especially in health scenarios, so users understand what the app knows, what it does not know, and when they should seek care.

## Project-Specific Notes

- The app combines fitness tracking, symptom triage, medicine guidance, doctor discovery, appointment booking, and reporting.
- The backend seed data is designed to make the demo experience realistic, including a featured patient with live and historical appointments.
- The AI service should be treated as one component in a larger care workflow, not the final medical authority.
