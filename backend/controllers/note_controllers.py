from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from fastapi.security import APIKeyHeader

from views.user_serializer import user_serializer
from controllers.docs.models import RegistrableNote, UpgradableNote
from utils.jwt_gateway import JWTGateway
from models.note import Note, NoteModel


note_router = APIRouter(prefix="/note", tags=["Notes"])
jwt_scheme = APIKeyHeader(name="Authorization")


@note_router.get("")
def get_notes(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    notes = NoteModel().get_notes(user_id)
    notes_data = {"data": notes} if notes else {}

    status_code = status.HTTP_200_OK if notes else status.HTTP_404_NOT_FOUND
    return JSONResponse(
        {"message": "success" if notes else "Not found", **notes_data},
        status_code=status_code
    )


@note_router.post("")
def register_note(note: RegistrableNote, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    note_entity = Note(user_id, note.title, note.note, note.topic)
    if not note_entity.is_valid():
        return JSONResponse({"message": "note isn't valid"}, status_code=status.HTTP_400_BAD_REQUEST)

    inserted = NoteModel().register_note(note_entity)
    status_code = status.HTTP_201_CREATED if inserted else status.HTTP_400_BAD_REQUEST
    return JSONResponse(
        {"message": "success" if inserted else "error when registering note in database"},
        status_code=status_code
    )


@note_router.put("")
def update_note(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)


@note_router.delete("")
def delete_note(jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)
