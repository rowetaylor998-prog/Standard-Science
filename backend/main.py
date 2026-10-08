from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import content

app = FastAPI(
    title="Standard Science API",
    description="Content and archive API for Standard Science.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(content.router, prefix="/api/content", tags=["content"])

@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
