from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from views.user_serializer import user_serializer
from controllers.docs.models import RegistrableUser, Login
from models.user import User, UserModel
from utils.jwt_gateway import JWTGateway
from utils.hasher import hash_password
from fastapi.security import APIKeyHeader

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
def update_user():
    pass


@user_router.delete("")
def delete_user():
    pass
