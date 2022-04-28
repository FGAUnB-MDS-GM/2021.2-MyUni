import "./styles.scss";

export default function NotebookTopic({onClick, title, description, label}) {
    return (
        <article onClick={onClick} className="notebook_article">
            <div className="notebook_article_content-top">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className="notebook_article_content-bottom">
                <div className="notebook_article_content-bottom_label">
                    <h4>{label}</h4>
                </div>
            </div>
        </article>
    );
}
