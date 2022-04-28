from pydantic import BaseModel


class RegistrableUser(BaseModel):
    name: str
    password: str
    user_type: int
    email: str
    college: str
    disciplines: list[str] = []


class Login(BaseModel):
    email: str
    password: str


class Discipline(BaseModel):
    code: str
    name: str


class DisciplineCode(BaseModel):
    discipline_code: str


class UpgradableUser(BaseModel):
    name: str | None = None
    college: str | None = None
    disciplines: list[str] | None = None


class Comment(BaseModel):
    forum_id: str
    comment: str


class Reply(BaseModel):
    forum_id: str
    comment_id: str
    reply: str


class RegistrableNote(BaseModel):
    title: str
    note: str
    topic: str


class UpgradableNote(BaseModel):
    note_id: str
    title: str | None = None
    note: str | None = None
    topic: str | None = None


class NoteId(BaseModel):
    note_id: str
