Project Name - CureIT

Team Members - Prajan Manoj Kumar Rekha (PrajanManojKumarRekha), Eric Cariaga (eCarCodes), Jessica C O'Bonna (jessic-o), Shayan Ali (CodewithShayan456)

Problem Statement -
Healthcare workflows are often slowed by fragmented records, difficult appointment discovery, and inconsistent clinical documentation. Patients struggle to find the right specialist quickly, while clinicians spend extra time converting consultation details into structured notes. For a fast-moving care environment, this creates delays, reduced continuity, and higher documentation overhead.

Solution -
CureIT is a prototype telehealth workflow platform focused on one clean end-to-end demo path:
- Patient enters symptoms (example: headache).
- System maps symptoms to a recommended specialty (example: Neurology).
- Patient views doctor availability and books an open slot.
- Doctor views appointment, runs a consultation simulation, and generates a structured SOAP note.
- SOAP note is converted into FHIR R4-style JSON for interoperable record formatting.

This project is a workflow/documentation prototype and is not a diagnostic tool. It is designed for hackathon speed with clear team boundaries across frontend, API, core logic, and database layers.

Tech Stack -
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- API Gateway: FastAPI, Pydantic
- Core Logic: Pure Python 3.12, dataclasses, deterministic rule-based processing
- Database: Supabase (PostgreSQL)
- Data Standard: FHIR R4 JSON (prototype output)
- Security/Compliance Approach: role-based route separation, mock auth for demo, HIPAA-aware handling principles in design