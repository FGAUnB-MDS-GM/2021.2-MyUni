from fastapi import APIRouter, Depends, status
from fastapi.security import APIKeyHeader
from fastapi.responses import JSONResponse

from utils.jwt_gateway import JWTGateway
from controllers.docs.models import Comment, Reply
from models.forum import ForumModel
from models.comment import Comment as CommentEntity
from models.reply import Reply as ReplyEntity


comment_router = APIRouter(prefix="/comment", tags=["Comments"])
jwt_scheme = APIKeyHeader(name="Authorization")


@comment_router.post("")
def comment_in_forum(comment: Comment, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    comment_entity = CommentEntity(user_id, comment.comment, comment.title, comment.topic)

    if not comment_entity.is_valid():
        return JSONResponse({"message": "comment isn't valid"}, status_code=status.HTTP_400_BAD_REQUEST)

    commented = ForumModel().register_comment(comment.forum_id, comment_entity)

    status_code = status.HTTP_200_OK if commented else status.HTTP_400_BAD_REQUEST
    return JSONResponse(
        {"message": "success" if commented else "error when adding comment to forum in database"},
        status_code=status_code
    )


@comment_router.post("/reply")
def reply_comment(reply: Reply, jwt: str = Depends(jwt_scheme)):
    user_id = JWTGateway().retrieve_payload(jwt).get("user_id")
    if not user_id:
        return JSONResponse({"message": "Unauthorized"}, status_code=status.HTTP_401_UNAUTHORIZED)

    reply_entity = ReplyEntity(user_id, reply.reply)
    if not reply_entity.is_valid():
        return JSONResponse({"message": "reply isn't valid"})

    replied = ForumModel().reply_comment(reply.forum_id, reply.comment_id, reply_entity)
    status_code = status.HTTP_200_OK if replied else status.HTTP_400_BAD_REQUEST
    return JSONResponse(
        {"message": "success" if replied else "error when adding reply to comment in database"},
        status_code=status_code
    )
