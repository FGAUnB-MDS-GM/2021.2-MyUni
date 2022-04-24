import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import "./styles.scss";
import NewForumTopic from "../../components/newForumTopic";
import ForumTopic from "../../components/forumTopic";

function Forum() {
  const forumTopic = [
    {
      title: "Alguem consegue me ajudar com calculo 1?",
      description:
        "Tendo em vista essa desconexão com o mundo real que os estudantes de Cálculo 1 enfrentam, mostraremos um exemplo de como essa disciplina é importante em um projeto de Engenharia.  No caso, o projeto em especial envolve a etapa da recuperação de um foguete amador. Por meio do máximo de uma função, é possível saber qual a altura máxima, denominada apogeu, será atingida pelo foguete.",
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
    <Layout title="Fórum">
      <div id="forum" className="forum">
        <div className="forum_content">
          <SearchInput />
          {forumTopic.map((topic, index) => {
            return (
              <ForumTopic
                photo={topic.photo}
                title={topic.title}
                description={topic.description}
                user={topic.user}
                label={topic.label}
              />
            );
          })}
        </div>
        <div className="forum_aside">
          <NewForumTopic />
          <aside className="forum_aside_sidebar">
            <h3>Tópicos</h3>
            <ul>
              {forumTopic.map((topic, index) => {
                return (
                  <li key={index}>
                    <a>{topic.label}</a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
export default Forum;
