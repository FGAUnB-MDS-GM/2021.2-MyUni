from typing import Dict

from fastapi import FastAPI, Request
from fastapi.openapi.utils import get_openapi
from dotenv import load_dotenv

from controllers.forum_controllers import forum_router
from controllers.user_controller import user_router


app = FastAPI()
app.include_router(forum_router)
app.include_router(user_router)


@app.get("/", include_in_schema=False)
def api_root():
    return {"message": "MyUni API"}


@app.middleware("http")
async def before_request(request: Request, call_next):
    load_dotenv()

    response = await call_next(request)
    return response


def customize_openapi(openapi_schema: Dict):
    pass


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="MyUni API",
        version="1.0.0",
        description="Endpoint documentation to MyUni api.",
        routes=app.routes,
    )

    customize_openapi(openapi_schema)
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
