# MedRoute

AI-powered medical triage assistant. Describe your symptoms in plain language and get an urgency assessment (Emergency / Urgent / Semi-Urgent / Non-Urgent / Self-Care) with concrete next steps and a map of nearby care facilities — no account or API key required.

Built for the CareDevi AI Innovation Hackathon 2026.

**Team Byte Beasts** — Fidel, Eladio, Jeheon

**Live demo:** https://hackathon-2026-projects-production.up.railway.app/

---

## How it works

MedRoute conducts a short conversational interview, asks focused follow-up questions, then returns a structured triage assessment with:

- An urgency level and recommended action
- Concrete, level-specific next steps (what to do right now)
- A map of nearby care facilities matched to urgency (ER, urgent care, clinic, or pharmacy)
- Session history that persists across page refreshes

The app uses Groq's `llama-3.3-70b-versatile` model through a server-side proxy so the API key never touches the browser.

---

## Tech stack

- **Frontend** — React + Vite
- **Backend** — Node.js + Express (proxies Groq API)
- **AI** — Groq API (`llama-3.3-70b-versatile`)
- **Maps** — Leaflet + OpenStreetMap + Overpass API (no key required)
- **History** — localStorage via `historyStorage.js`

---

## Setup

**Prerequisites:** Node.js 18+, a free Groq API key from [console.groq.com](https://console.groq.com)

```bash
# 1. Install dependencies
npm install

# 2. Add your Groq API key
echo "GROQ_API_KEY=your_key_here" > .env

# 3. Start the Express backend (port 3001)
node server.js

# 4. In a second terminal, start the Vite dev server (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build   # outputs to dist/
node server.js  # serves frontend + API on port 3001
```

---

## Project structure

```
├── server.js                          # Express backend — proxies /api/chat to Groq
├── src/
│   ├── App.jsx                        # Router, active session state, history navigation
│   ├── historyStorage.js              # localStorage helpers for saving/updating sessions
│   ├── textFormatting.jsx             # Shared markdown cleanup/rendering helpers
│   ├── pages/
│   │   ├── Home.jsx                   # Landing page
│   │   ├── Triage.jsx                 # Chat UI, triage flow, session save/resume logic
│   │   ├── History.jsx                # Saved session list with continue/view actions
│   │   └── History.module.css
│   └── components/
│       ├── NearbyFacilities.jsx       # Map + facility list shown after assessment
│       ├── NearbyFacilities.module.css
│       ├── NextSteps.jsx              # Urgency-specific action steps shown after assessment
│       └── NextSteps.module.css
├── vite.config.js                     # Dev proxy: /api → localhost:3001
└── .env                               # GROQ_API_KEY (never committed)
```

---

## Deployment

Hosted on Railway. Auto-deploys on every push to `main`.

- Build command: `npm run build`
- Start command: `node server.js`
- Required env var: `GROQ_API_KEY`
