from datetime import datetime
from typing import Dict


class Reply:
    def __init__(self, user_id: str, comment: str):
        self.user_id = user_id
        self.comment = comment

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "user_id": self.user_id,
            "comment": self.comment,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.user_id,
            self.comment
        ])
