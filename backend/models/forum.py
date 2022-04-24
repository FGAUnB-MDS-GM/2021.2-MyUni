from datetime import datetime
from typing import Dict

from models.mixins.mongodb import MongoDBMixin


class Forum:
    def __init__(self, discipline_id: str, comments: list[Dict] = None):
        self.discipline_id = discipline_id
        self.comments = comments if comments else []

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "discipline_id": self.discipline_id,
            "comments": self.comments,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.discipline_id
        ])


class ForumModel(MongoDBMixin):
    def get_forums_by_disciplines_code(self, disciplines_code: list[str]) -> list[Dict]:
        forums = self.forum_collection.find({"code": {"$in": disciplines_code}})
        return [forum for forum in forums]

    def register_forum(self, forum: Forum) -> bool:
        insert_response = self.forum_collection.insert_one(forum.to_dict())
        return True if insert_response.acknowledged else False
