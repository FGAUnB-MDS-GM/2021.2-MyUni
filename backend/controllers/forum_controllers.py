from fastapi import APIRouter, Depends, status
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse

from utils.jwt_gateway import JWTGateway
from models.user import UserModel
from models.forum import ForumModel
from controllers.docs.models import DisciplineCode


forum_router = APIRouter(prefix="/forum", tags=["Forum"])
jwt_scheme = APIKeyHeader(name="Authorization")


@forum_router.get("")
def get_forums(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    user = UserModel().retrieve_user_by_id(user_id)
    if not user:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    user_disciplines = user.get("disciplines")
    forums = ForumModel().get_forums_by_disciplines_code(user_disciplines)
    if not forums:
        return JSONResponse({"message": "Not found"}, status_code=status.HTTP_404_NOT_FOUND)

    return JSONResponse(forums, status_code=status.HTTP_200_OK)


@forum_router.post("")
def register_forums(discipline_code: DisciplineCode):
    return {}
