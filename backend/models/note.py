from datetime import datetime
from typing import Dict

from bson import ObjectId
from bson.errors import BSONError

from models.mixins.mongodb import MongoDBMixin


class Note:
    def __init__(self, user_id: str, title: str, note: str, topic: str):
        self.user_id = user_id
        self.title = title
        self.note = note
        self.topic = topic

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "user_id": self.user_id,
            "title": self.title,
            "note": self.note,
            "topic": self.topic,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.user_id
        ])


class NoteModel(MongoDBMixin):
    def register_note(self, note: Note) -> bool:
        insert_response = self.note_collection.insert_one(note.to_dict())
        return True if insert_response.acknowledged else False

    def get_notes(self, user_id: str) -> list[Dict]:
        notes = self.note_collection.find(filter={"user_id": user_id})

        notes = [note for note in notes]
        for _note in notes:
            _note["note_id"] = str(_note.pop("_id"))

        return notes

    def delete_note(self, note_id: str) -> bool:
        try:
            mongo_id = ObjectId(note_id)
        except BSONError:
            return False

        delete_response = self.note_collection.delete_one({"_id": mongo_id})
        return True if delete_response.deleted_count else False
