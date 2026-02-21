from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.article import ArticleCreate, ArticleResponse
from app.repositories.article_repo import create_article, get_articles, get_article_by_id
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/articles",
    tags=["Articles"]
)

@router.post(
    "",
    response_model=ArticleResponse,
    status_code=status.HTTP_201_CREATED
)
def create_new_article(
    article_in: ArticleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    article = create_article(
        db=db,
        title=article_in.title,
        content=article_in.content,
        author_id=current_user.id
    )

    return article


@router.get("", response_model=list[ArticleResponse], status_code=status.HTTP_200_OK)
def get_all_articles(db:Session = Depends(get_db)):
    return get_articles(db)

@router.get("/article/{article_id}", response_model=ArticleResponse, status_code=status.HTTP_200_OK)
def get_article_using_id(article_id: int, db: Session = Depends(get_db)):
    return get_article_by_id(article_id, db)