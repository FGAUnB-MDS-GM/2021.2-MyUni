from fastapi import APIRouter


forum_router = APIRouter(prefix="/forum", tags=["Forum"])


@forum_router.get("")
def get_forums():
    return {}


@forum_router.post("")
def register_forums():
    return {}
