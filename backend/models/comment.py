from datetime import datetime
from typing import Dict
from uuid import uuid4


class Comment:
    def __init__(self, user_id: str, comment: str, title: str, topic: str, username: str, replies: list[Dict] = None):
        self.user_id = user_id
        self.comment = comment
        self.replies = replies if replies else []
        self.title = title
        self.topic = topic
        self.username = username

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "comment_id": str(uuid4()),
            "user_id": self.user_id,
            "replies": self.replies,
            "comment": self.comment,
            "topic": self.topic,
            "title": self.title,
            "username": self.username,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.user_id,
            self.comment
        ])
