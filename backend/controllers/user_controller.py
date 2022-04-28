from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from fastapi.security import APIKeyHeader

from views.user_serializer import user_serializer
from controllers.docs.models import RegistrableUser, Login, UpgradableUser
from models.user import User, UserModel
from utils.jwt_gateway import JWTGateway
from utils.hasher import hash_password


user_router = APIRouter(prefix="/user", tags=["User"])
jwt_scheme = APIKeyHeader(name="Authorization")


@user_router.get("")
def get_user_by_id(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    user = UserModel().retrieve_user_by_id(user_id)
    if not user:
        return JSONResponse({"message": "Not found"}, status_code=status.HTTP_404_NOT_FOUND)
    return JSONResponse(user_serializer(user), status_code=status.HTTP_200_OK)


@user_router.post("")
def register_user(user: RegistrableUser):
    user_service = UserModel()
    if user_service.user_exists_by_email(user.email):
        return JSONResponse(content={"message": "email already exists."}, status_code=status.HTTP_400_BAD_REQUEST)

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

    inserted_id = user_service.register_user(user_entity)
    status_code = status.HTTP_201_CREATED if inserted_id else status.HTTP_400_BAD_REQUEST
    response = {
        "jwt": JWTGateway().generate_jwt({"user_id": inserted_id})
    } if inserted_id else {"message": "error when saving register in database"}

    return JSONResponse(content=response, status_code=status_code)


@user_router.post("/login")
def login_user(login: Login):
    user_id = UserModel().retrieve_user_by_login(login.email, hash_password(login.password))
    response = {"jwt": JWTGateway().generate_jwt({"user_id": user_id})} if user_id else {"message": "Not found"}
    status_code = status.HTTP_200_OK if user_id else status.HTTP_404_NOT_FOUND

    return JSONResponse(content=response, status_code=status_code)


@user_router.put("")
def update_user(upgradable_user: UpgradableUser, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    if upgradable_user.name == "" or upgradable_user.college == "":
        return JSONResponse({"message": "user isn't valid"}, status_code=status.HTTP_400_BAD_REQUEST)

    disciplines_modifications = {}
    if upgradable_user.disciplines is not None and isinstance(upgradable_user.disciplines, list):
        disciplines_modifications = {"disciplines": upgradable_user.disciplines}

    name_modifications = {"name": upgradable_user.name} if upgradable_user.name else {}
    college_modifications = {"college": upgradable_user.college} if upgradable_user.college else {}

    update_modifications = {
        **name_modifications,
        **college_modifications,
        **disciplines_modifications
    }

    updated = UserModel().update_user(user_id, update_modifications)
    status_code = status.HTTP_200_OK if updated else status.HTTP_400_BAD_REQUEST
    return JSONResponse(
        {"message": "success" if updated else "error when updating user in database"},
        status_code=status_code
    )


@user_router.delete("")
def delete_user(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    deleted = UserModel().delete_user(user_id)
    status_code = status.HTTP_200_OK if deleted else status.HTTP_400_BAD_REQUEST

    return JSONResponse(
        {"message": "success" if deleted else "error when deleting user in database"},
        status_code=status_code
    )


@user_router.get("/{user_id}")
def get_user(user_id, jwt: str = Depends(jwt_scheme)):
    _user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not _user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    user = UserModel().retrieve_user_by_id(user_id)
    if user:
        user_serializer(user)
        return JSONResponse({"message": "success", "data": user}, status_code=status.HTTP_200_OK)

    return JSONResponse({"message": "Not found"}, status_code=status.HTTP_404_NOT_FOUND)
