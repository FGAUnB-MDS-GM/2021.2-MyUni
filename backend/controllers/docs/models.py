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
    code: str
