from uuid import uuid4


def test_create_user(load_test_env, fast_api_client, user_collection_access):
    username = str(uuid4())
    user_information = {
        "name": username,
        "password": "test password",
        "user_type": 0,
        "email": "test@test.com",
        "college": "UNB",
        "disciplines": []
    }

    response = fast_api_client.post("/user", json=user_information)
    assert response.status_code == 201
    assert response.json().get("jwt")

    delete_response = user_collection_access.delete_one({"name": username})
    assert delete_response.deleted_count == 1


def test_create_user_with_invalid_name(load_test_env, fast_api_client):
    user_information = {
        "name": "",
        "password": "test password",
        "user_type": 0,
        "email": "test@test.com",
        "college": "UNB",
        "disciplines": []
    }

    response = fast_api_client.post("/user", json=user_information)
    assert response.status_code == 400
    assert response.json().get("message") == "user isn't valid"


def test_create_user_with_invalid_password(load_test_env, fast_api_client):
    user_information = {
        "name": "test username",
        "password": "1234567",
        "user_type": 0,
        "email": "test@test.com",
        "college": "UNB",
        "disciplines": []
    }

    response = fast_api_client.post("/user", json=user_information)
    assert response.status_code == 400
    assert response.json().get("message") == "user isn't valid"


def test_create_user_with_invalid_email(load_test_env, fast_api_client):
    user_information = {
        "name": "test username",
        "password": "12345678",
        "user_type": 0,
        "email": "test.com",
        "college": "UNB",
        "disciplines": []
    }

    response = fast_api_client.post("/user", json=user_information)
    assert response.status_code == 400
    assert response.json().get("message") == "user isn't valid"


def test_create_user_with_invalid_college(load_test_env, fast_api_client):
    user_information = {
        "name": "test username",
        "password": "12345678",
        "user_type": 0,
        "email": "test@test.com",
        "college": "",
        "disciplines": []
    }

    response = fast_api_client.post("/user", json=user_information)
    assert response.status_code == 400
    assert response.json().get("message") == "user isn't valid"
