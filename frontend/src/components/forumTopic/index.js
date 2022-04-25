import { ChatIcon } from "@heroicons/react/solid";
import "./styles.scss";

export default function ForumTopic({ onClick, photo, title, description, user, label }) {
  return (
    <article onClick={onClick} className="forum_article">
      <div className="forum_article_content-top">
        <img
          className="forum_article_content-top_photo"
          src={photo}
          alt="user profile"
        />
        <div className="forum_article_content-top_text">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="forum_article_content-bottom">
        <div className="forum_article_content-bottom-left">
          <h3>{user}</h3>
          <div className="forum_article_content-bottom_label">
            <h4>{label}</h4>
          </div>
        </div>
        <div className="forum_article_content-bottom_comment">
          <span>9</span>
          <span>
            <ChatIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
