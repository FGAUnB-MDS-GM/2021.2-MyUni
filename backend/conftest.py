from pytest import fixture
from fastapi.testclient import TestClient
from dotenv import load_dotenv

from main import app
from models.mixins.mongodb import MongoDBMixin


@fixture()
def fast_api_client():
    return TestClient(app)


@fixture()
def user_collection_access():
    return MongoDBMixin().user_collection


@fixture()
def load_test_env():
    load_dotenv()
