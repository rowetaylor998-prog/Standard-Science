# Standard Science

Standard Science is an open knowledge archive. The current implementation focuses on the Computer Science Internet Archive, Lessons, and Git-backed reading material.

## Active routes

- `/` — Standard Science archive homepage
- `/computer-science` — Computer Science Internet Archive
- `/computer-science/subjects`
- `/computer-science/library`
- `/computer-science/scientists`
- `/computer-science/history`
- `/computer-science/practice-projects`
- `/computer-science/faq`
- `/computer-science/search`
- `/lessons`

The old Open Meeting system, embedded AI tutor, AI lab, Archive of Sparks prototype, people-index prototype, and VitePress knowledge-tree frontend have been removed.

AI assistance is external to the site. Use ChatGPT or another chosen tool separately instead of maintaining a second AI application inside Standard Science.

## Run locally

Frontend:

```bash
cd apps/web
npm install
npm run dev
```

Backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The frontend defaults to `http://127.0.0.1:8000` for Markdown/search APIs. Override it with `apps/web/.env` if needed.

## Repository map

- `apps/web/` — React/Vite archive frontend
- `backend/` — minimal FastAPI content/search backend
- `content/` — Markdown knowledge and lessons
- `docs/` — current project notes
- `scripts/` — development/build helpers
- `docker/` — deployment helpers
