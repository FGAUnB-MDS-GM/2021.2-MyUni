from hashlib import sha224


def hash_password(password: str):
    return sha224(password.encode()).hexdigest()
