from bson import ObjectId
from bson.errors import BSONError

from datetime import datetime
from typing import Dict

from models.mixins.mongodb import MongoDBMixin
from views.forum_serializer import forum_serializer
from models.comment import Comment
from models.reply import Reply


class Forum:
    def __init__(self, discipline_code: str, comments: list[Dict] = None):
        self.discipline_code = discipline_code
        self.comments = comments if comments else []

        now = datetime.utcnow().isoformat()
        self.created_at = now
        self.updated_at = now

    def to_dict(self) -> Dict:
        return {
            "discipline_code": self.discipline_code,
            "comments": self.comments,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def is_valid(self) -> bool:
        return all([
            self.discipline_code
        ])


class ForumModel(MongoDBMixin):
    def get_forums_by_disciplines_code(self, disciplines_code: list[str]) -> list[Dict]:
        forums = self.forum_collection.find({"discipline_code": {"$in": disciplines_code}})
        return [forum_serializer(forum) for forum in forums]

    def register_forum(self, forum: Forum) -> bool:
        insert_response = self.forum_collection.insert_one(forum.to_dict())
        return True if insert_response.acknowledged else False

    def register_comment(self, forum_id: str, comment: Comment) -> bool:
        try:
            mongo_id = ObjectId(forum_id)
        except BSONError:
            return False

        updated = self.forum_collection.find_one_and_update(
            {"_id": mongo_id},
            {"$push": {"comments": comment.to_dict()}}
        )
        return True if updated else False

    def reply_comment(self, forum_id: str, comment_id: str, reply: Reply) -> bool:
        try:
            mongo_id = ObjectId(forum_id)
        except BSONError:
            return False

        updated = self.forum_collection.find_one_and_update(
            filter={"_id": mongo_id},
            update={"$push": {"comments.$[comment].replies": reply.to_dict()}},
            array_filters=[{"comment.comment_id": {"$eq": comment_id}}]
        )
        return True if updated else False

    def get_forum_by_id(self, forum_id: str):
        try:
            mongo_id = ObjectId(forum_id)
        except BSONError:
            return False

        forum = self.forum_collection.find_one({"_id": mongo_id}) or {}
        if forum:
            forum["forum_id"] = str(forum.pop("_id"))

        return forum

    def delete_comment(self, comment_id: str) -> bool:
        delete_response = self.forum_collection.find_one_and_update(
            filter={"_id": ObjectId("626a17a840619b67935aa831")},
            update={"$pull": {"comments": {"comment_id": comment_id}}}
        )
        return True if delete_response else False

    def get_comment(self, forum_id: str, comment_id: str) -> Dict:
        try:
            mongo_id = ObjectId(forum_id)
        except BSONError:
            return {}

        forum = self.forum_collection.find_one({"_id": mongo_id}) or {}
        comments = forum.get("comments")

        for comment in comments:
            if comment.get("comment_id") == comment_id:
                return comment

        return {}
