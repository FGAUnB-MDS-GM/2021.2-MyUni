from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from fastapi.security import APIKeyHeader

from controllers.docs.models import RegistrableNote, UpgradableNote, NoteId
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
def update_note(note: UpgradableNote, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    title_modifications = {"title": note.title} if note.title is not None else {}
    note_modifications = {"note": note.note} if note.note is not None else {}
    topic_modifications = {"topic": note.topic} if note.topic is not None else {}

    update_modifications = {
        **title_modifications,
        **note_modifications,
        **topic_modifications
    }

    updated = NoteModel().update_note(note.note_id, update_modifications)
    status_code = status.HTTP_200_OK if updated else status.HTTP_400_BAD_REQUEST
    return JSONResponse(
        {"message": "success" if updated else "error when updating note in database"},
        status_code=status_code
    )


@note_router.delete("")
def delete_note(note_id: NoteId, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    deleted = NoteModel().delete_note(note_id.note_id)
    status_code = status.HTTP_200_OK if deleted else status.HTTP_404_NOT_FOUND
    return JSONResponse(
        {"message": "success" if deleted else "Not found"},
        status_code=status_code
    )
