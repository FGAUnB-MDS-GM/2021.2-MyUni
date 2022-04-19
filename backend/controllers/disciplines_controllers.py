from fastapi import APIRouter, Depends, status
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse

from utils.jwt_gateway import JWTGateway
from controllers.docs.models import Discipline as DisciplinePydantic
from models.discipline import Discipline, DisciplineModel


disciplines_router = APIRouter(prefix="/disciplines", tags=["Disciplines"])
jwt_scheme = APIKeyHeader(name="Authorization")


@disciplines_router.post("")
def register_discipline(discipline: DisciplinePydantic, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    discipline = Discipline(
        discipline.code,
        discipline.name
    )

    if not discipline.is_valid():
        return JSONResponse(content={"message": "discipline isn't valid"}, status_code=status.HTTP_400_BAD_REQUEST)

    discipline_model = DisciplineModel()
    if discipline_model.discipline_code_exists(discipline.code):
        return JSONResponse(content={"message": "discipline already exists"})

    inserted = DisciplineModel().register_discipline(discipline)
    message = {"message": "success" if inserted else "error when inserting discipline in database"}
    status_code = status.HTTP_201_CREATED if inserted else status.HTTP_400_BAD_REQUEST
    return JSONResponse(content=message, status_code=status_code)


@disciplines_router.get("")
def get_disciplines():
    disciplines = DisciplineModel().get_disciplines()
    data_disciplines = {"data": disciplines} if disciplines else {}

    message = {"message": "success" if disciplines else "Not found", **data_disciplines}
    status_code = status.HTTP_200_OK if disciplines else status.HTTP_404_NOT_FOUND

    return JSONResponse(content=message, status_code=status_code)
