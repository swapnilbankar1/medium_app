from sqlalchemy.orm import Session
from app.models.article import Article

def create_article(
    db: Session,
    title: str,
    content: str,
    author_id: int
):
    article = Article(
        title=title,
        content=content,
        author_id=author_id
    )
    db.add(article)
    db.commit()
    db.refresh(article)
    return article

def get_articles_by_author_id(db: Session, authord_id: int):
    return db.query(Article).filter(Article.author_id == authord_id).all()

def get_articles(db:Session):
    return db.query(Article).all()

def get_article_by_id(article_id: int, db:Session):
    return db.query(Article).filter(Article.id == article_id).first()