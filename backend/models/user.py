from typing import Dict
from datetime import datetime
from re import match

from models.mixins.mongodb import MongoDBMixin
from utils.hasher import hash_password


class User:
    def __init__(self, name: str, password: str, user_type: int, email: str, college: str, disciplines: list[str]):
        self.name = name
        self.password = password
        self.user_type = user_type
        self.email = email
        self.college = college
        self.disciplines = disciplines

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "name": self.name,
            "password": hash_password(self.password),
            "user_type": self.user_type,
            "email": self.email,
            "college": self.college,
            "disciplines": self.disciplines,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.name,
            len(self.password) >= 8,
            match(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)", self.email) is not None,
            self.college
        ])


class UserModel(MongoDBMixin):
    def user_exists_by_email(self, email: str):
        user = self.user_collection.find_one({"email": email}) or {}
        return True if user.get("_id") else False

    def register_user(self, user: User) -> str:
        insert_response = self.user_collection.insert_one(user.to_dict())
        return str(insert_response.inserted_id) if insert_response.acknowledged else ""

    def retrieve_user_by_login(self, email: str, hashed_password: str) -> str:
        user = self.user_collection.find_one({"email": email, "password": hashed_password}) or {}
        return str(user.get("_id", ""))
