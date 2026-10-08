# Contributing

Standard Science is deliberately small. Prefer focused changes that improve the active archive rather than adding parallel product experiments.

## Active areas

- `apps/web/`
- `backend/`
- `content/knowledge/computer-science/`
- `content/methods-and-lessons/`
- `docs/`

## Rules

- Keep the archive readable and simple.
- Prefer stable primary or official sources.
- Separate facts, interpretation, and opinion.
- Do not commit API keys or private data.
- Do not add an embedded AI tutor or a second AI application. AI assistance is external to Standard Science.
- Do not restore the old Open Meeting, Archive of Sparks, people-index, or VitePress frontend without a new design decision.

Frontend check:

```bash
cd apps/web
npm install
npm run build
```

Backend check:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
