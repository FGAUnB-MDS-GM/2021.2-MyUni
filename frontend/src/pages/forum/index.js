import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import "./styles.scss";

function Forum() {
  const forumTopic = [
    {
      title: "Alguem consegue me ajudar com calculo 1?",
      description: "Estou tentando resolver uns B.O",
      label: "Calculo 1",
      user: "Bernardo",
      photo: "https://avatars.githubusercontent.com/u/57421498?v=4",
    },
    {
      title: "Alguem sabe quando acaba o semestre?",
      description: "não aguento mais essa loucura",
      label: "Geral",
      user: "Guilherme",
      photo: "https://avatars.githubusercontent.com/u/57421498?v=4",
    },
  ];
  return (
    <Layout>
      <div className="forum">
        <div className="forum_content">
          <SearchInput />
          {forumTopic.map((topic) => {
            return (
              <article className="forum_article">
                <div className="forum_article_content-top">
                  <img
                    className="forum_article_content-top_photo"
                    src={topic.photo}
                    alt="user profile"
                  />
                  <h1>{topic.title}</h1>
                  <h2>{topic.description}</h2>
                </div>
                <div className="forum_article_content-bottom">
                  <h3>{topic.user}</h3>
                  <div className="forum_article_content-bottom_label">
                    <h4>{topic.label}</h4>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
export default Forum;
