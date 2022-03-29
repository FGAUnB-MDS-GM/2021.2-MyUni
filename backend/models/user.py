from typing import Dict
from datetime import datetime
from re import match
from hashlib import sha224

from models.mixins.mongodb import MongoDBMixin


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
            "password": sha224(self.password.encode()).hexdigest(),
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
    def register_user(self, user: User) -> str:
        insert_response = self.user_collection.insert_one(user.to_dict())
        return str(insert_response.inserted_id) if insert_response.acknowledged else ""
