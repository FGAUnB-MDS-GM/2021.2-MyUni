import { useNavigate } from "react-router-dom";
import { ChatIcon } from "@heroicons/react/solid";
import "./styles.scss";

export default function ForumTopic({ topic }) {
  const router = useNavigate();
  return (
    <article
      onClick={() => router(`/forum/${topic.comment_id}`)}
      className="forum_article"
    >
      <div className="forum_article_content-top">
        <img
          className="forum_article_content-top_photo"
          src="https://i.ibb.co/zrhG1X3/default-avatar.jpg"
          alt="user profile"
        />
        <div className="forum_article_content-top_text">
          <h1>{topic.title}</h1>
          <p>{topic.comment}</p>
        </div>
      </div>
      <div className="forum_article_content-bottom">
        <div className="forum_article_content-bottom-left">
          <h3>{topic.username}</h3>
          <div className="forum_article_content-bottom_label">
            <h4>{topic.topic}</h4>
          </div>
          <h4>{new Date(topic.created_at).toLocaleDateString()}</h4>
        </div>

        <div className="forum_article_content-bottom_comment">
          <span>{Object.keys(topic.replies).length}</span>
          <span>
            <ChatIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
