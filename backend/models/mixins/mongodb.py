from os import environ

from pymongo import MongoClient
from pymongo.collection import Collection


class MongoDBMixin:
    def __init__(self):
        host = environ.get("MONGO_HOST")
        port = environ.get("MONGO_PORT")
        user = environ.get("MONGO_USER")
        password = environ.get("MONGO_PASSWORD")

        if not all([host, port, user, password]):
            raise Exception(".env file missing variables")

        self._client = MongoClient(
            host=host,
            port=int(port),
            username=user,
            password=password
        )

        self._user_db = self._client.user
        self.user_collection: Collection = self._user_db.user

    @property
    def client(self):
        return self._client
