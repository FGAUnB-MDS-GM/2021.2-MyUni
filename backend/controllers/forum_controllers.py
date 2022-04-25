from fastapi import APIRouter, Depends, status
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse

from utils.jwt_gateway import JWTGateway
from models.user import UserModel
from models.forum import ForumModel, Forum
from controllers.docs.models import DisciplineCode
from models.discipline import DisciplineModel


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
    forum = Forum(discipline_code.discipline_code)
    discipline = DisciplineModel().discipline_code_exists(discipline_code.discipline_code)

    if not forum.is_valid() or not discipline:
        return JSONResponse({"message": "Forum isn't valid"})

    forum_already_exists = ForumModel().get_forums_by_disciplines_code([discipline_code.discipline_code])
    if forum_already_exists:
        return JSONResponse(
            {"message": f"Forum with discipline code {discipline_code.discipline_code} already exists"},
            status_code=status.HTTP_400_BAD_REQUEST
        )
    registered = ForumModel().register_forum(forum)

    if registered:
        return JSONResponse({"message": "success"}, status_code=status.HTTP_201_CREATED)

    return JSONResponse({"message": "Error in database"}, status_code=status.HTTP_400_BAD_REQUEST)
