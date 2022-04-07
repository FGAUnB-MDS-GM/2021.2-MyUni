from os import environ
from typing import Dict

from jose import jwt, JWTError


class JWTGateway:
    def __init__(self):
        self._jwt_algorithm = "HS256"
        self._secret_key = environ.get("SECRET_KEY")

        if not self._secret_key:
            raise Exception(".env file missing variables")

    def generate_jwt(self, payload: Dict) -> str:
        token = jwt.encode(payload, self._secret_key, algorithm=self._jwt_algorithm)
        return token

    def retrieve_payload(self, token: str) -> Dict:
        try:
            payload = jwt.decode(token, self._secret_key, self._jwt_algorithm)
        except JWTError:
            return {}

        return payload
