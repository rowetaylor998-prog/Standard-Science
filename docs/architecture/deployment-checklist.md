# Deployment Checklist

## Frontend

```bash
cd apps/web
npm install
npm run build
```

Confirm:

- TypeScript build passes.
- Vite produces `dist/`.
- Important routes work after direct refresh.
- `VITE_API_BASE_URL` points to the intended backend.

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Confirm:

- `/health` responds.
- `/api/content/markdown` works.
- `/api/content/index` works.
- `/api/content/search` works.

## Archive smoke test

- Standard Science homepage opens.
- Computer Science archive opens.
- Subjects, Library, Scientists, History, Practice & Projects, FAQ, Search, and Lessons open.
- Manual annotations can be saved on supported reading pages.
- No Open Meeting or embedded AI routes are exposed.
