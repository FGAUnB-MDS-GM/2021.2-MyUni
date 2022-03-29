from pydantic import BaseModel


class RegistrableUser(BaseModel):
    name: str
    password: str
    user_type: int
    email: str
    college: str
    disciplines: list[str] = []
