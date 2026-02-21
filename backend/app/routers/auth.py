from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.repositories.user_repo import get_user_by_email, create_user
from app.core.security import hash_password, verify_password, create_access_token
from app.schemas.auth import LoginRequest
from app.dependencies.auth import get_current_user
from app.models.user import User


router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED
)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    try:
        print(user_in)
        existing_user = get_user_by_email(db, user_in.email)
        print(existing_user)
        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        # Hash password
        password_hash = hash_password(user_in.password)

        # Create user
        user = create_user(
            db=db,
            username=user_in.username,
            email=user_in.email,
            password_hash=password_hash
        )

        return user
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/login")
def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = get_user_by_email(db, login_request.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if not verify_password(login_request.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user