from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from controllers.docs.models import RegistrableUser
from models.user import User, UserModel


user_router = APIRouter(prefix="/user", tags=["User"])


@user_router.post("")
def register_user(user: RegistrableUser):
    user_entity = User(
        user.name,
        user.password,
        user.user_type,
        user.email,
        user.college,
        user.disciplines
    )

    if not user_entity.is_valid():
        return JSONResponse(content={"message": "user isn't valid"}, status_code=status.HTTP_400_BAD_REQUEST)

    inserted_id = UserModel().register_user(user_entity)
    status_code = status.HTTP_201_CREATED if inserted_id else status.HTTP_400_BAD_REQUEST

    return JSONResponse(content={"inserted_id": inserted_id}, status_code=status_code)
