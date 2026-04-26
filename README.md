# Project Name

CausalCare AI: Root-Cause Health Intelligence Engine

## Team Members (names + GitHub handles)

- Mikesh Thapa (@eMpTy-intellect)
- Aryan Dhakal (@AryanDhakal)
- Prasanga Ghimire (@prasanga14)

## Problem Statement

Existing health AI tools tell users WHAT disease they may have, but never explain WHY — leaving patients confused and unable to take action.

- No Lifestyle Context: Current symptom checkers ignore critical lifestyle factors like smoking, sleep deprivation, and pollution exposure that significantly alter disease risk.

- Generic Recommendations: One-size-fits-all advice fails patients. A smoker with pneumonia needs different guidance than a non-smoker with the same condition.

- No "What-If" Scenarios: Patients cannot explore how changing their habits would reduce their risk — there is no tool for preventive decision-making.

## Solution Description

CausalCare AI is an explainable health risk guidance system that combines machine learning with a transparent risk adjustment layer.

How it works:

1. User selects symptoms and lifestyle factors (smoking, sleep, pollution).
2. ML model predicts the most likely disease and base confidence.
3. Risk engine adjusts risk based on disease-specific lifestyle sensitivities.
4. App returns:
   - disease prediction,
   - base and adjusted risk,
   - key contributing factors,
   - personalized recommendations,
   - what-if simulation scenarios (for example, quit smoking, improve sleep).
5. Prediction and simulation history are saved for demo analytics.

This project is decision support and educational guidance, not a medical diagnosis system.

## Tech Stack

- Frontend: React, Tailwind CSS, Axios
- Backend: FastAPI, Uvicorn, Pydantic
- ML: scikit-learn (RandomForestClassifier), pandas, numpy, joblib
- Data: Training.csv, Testing.csv, symptoms.json
- Database: SQLite (local file: src/database/causalcare.db)

## Setup Instructions

Run from the src folder.

### Windows

1. Run setup.bat
2. Start backend:
   - cd backend
   - python main.py
3. In a new terminal, start frontend:
   - cd frontend
   - npm start
4. Open http://localhost:3000

### macOS/Linux

1. Run setup.sh
2. Start backend:
   - cd backend
   - python main.py
3. In a new terminal, start frontend:
   - cd frontend
   - npm start
4. Open http://localhost:3000

Backend API docs: http://localhost:8000/docs

## Demo Link Or Screenshots

- Demo video link: https://www.youtube.com/watch?v=ObrtXRB_u_g
