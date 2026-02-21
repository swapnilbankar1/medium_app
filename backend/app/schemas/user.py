from pydantic import BaseModel, EmailStr
from datetime import datetime

# Used when user registers
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# Used in API responses
class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

