from pydantic import BaseModel
from datetime import datetime

# Used when creating an article
class ArticleCreate(BaseModel):
    title: str
    content: str


# Used when updating an article
class ArticleUpdate(BaseModel):
    title: str | None = None
    content: str | None = None


# Used in API responses
class ArticleResponse(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True
