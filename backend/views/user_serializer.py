from typing import Dict


def user_serializer(user: Dict) -> Dict:
    user["user_id"] = str(user.pop("_id"))
    user.pop("password")
    return user
