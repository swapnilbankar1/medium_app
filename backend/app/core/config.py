from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    APP_NAME: str = os.getenv("APP_NAME")
    APP_ENV: str = os.getenv("APP_ENV")

    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")
    DB_NAME: str = os.getenv("DB_NAME")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")

    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM")
    JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES"))

    @property
    def DATABASE_URL(self) -> str:
        return (
            f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

settings = Settings()
