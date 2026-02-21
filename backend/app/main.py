from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.health import router as health_router
from app.routers import auth, articles
from app.database.base import Base
from app.database.session import engine
from app.models import user, article
from app.models.user import User  # Import to register model with SQLAlchemy


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0"
)

# Create database tables on startup
@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

# CORS (frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/v1")
app.include_router(articles.router, prefix="/api/v1")

# @app.get("/")
# def root():
#     return {"message": "Medium Clone API is running"}

