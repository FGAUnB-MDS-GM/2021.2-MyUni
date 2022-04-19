from typing import Dict
from datetime import datetime

from models.mixins.mongodb import MongoDBMixin
from views.discipline_serializer import discipline_serializer


class Discipline:
    def __init__(self, code: str, name: str):
        self.code = code
        self.name = name

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "code": self.code,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.code,
            self.name
        ])


class DisciplineModel(MongoDBMixin):
    def register_discipline(self, discipline: Discipline) -> bool:
        insert_response = self.discipline_collection.insert_one(discipline.to_dict())
        return True if insert_response.acknowledged else False

    def discipline_code_exists(self, discipline_code: str) -> bool:
        discipline = self.discipline_collection.find_one({"code": discipline_code})
        return True if discipline else False

    def get_disciplines(self) -> list[Dict]:
        disciplines_cursor = self.discipline_collection.find()
        disciplines = [discipline_serializer(discipline) for discipline in disciplines_cursor]
        return disciplines
