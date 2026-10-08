# System Overview

Standard Science currently uses a deliberately small architecture:

- **React/Vite frontend** in `apps/web/`
- **FastAPI content/search backend** in `backend/`
- **Git-backed Markdown content** in `content/`
- **Browser-local manual annotations** on supported reading pages

The site does not contain an embedded AI tutor, local-model lab, Open Meeting service, or story/game subsystem. AI assistance is external to the site.

## Data flow

1. The browser loads the archive UI from the React frontend.
2. Static archive metadata is rendered directly in the frontend.
3. Markdown and search requests go to `/api/content/*`.
4. FastAPI reads content from the repository's `content/` directory.
5. Manual annotations are stored in browser localStorage.
