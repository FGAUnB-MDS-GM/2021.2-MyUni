import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import Input from "../../components/Input";
import Button from "../../components/Button";
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
            <div id="forum" className="forum">
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
                                    <div className="forum_article_content-bottom_comment">
                                        <span>9</span>
                                        <span>💬</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <div className="forum_aside">
                    <form className="forum_aside_form">
                        <h3>Adicionar um tópico</h3>
                        <Input
                        name="pergunta"
                        type="text"
                        title="Pergunta:"
                        placeholder="pergunta"
                        />
                        <Input
                        name="descrição"
                        type="text"
                        title="Descrição:"
                        placeholder="descrição"
                        />
                        <Input
                        name="topico"
                        type="text"
                        title="Tópico:"
                        placeholder="topico"
                        />
                        <div className="forum_aside_form_button"><Button label="Adicionar" /></div>
                    </form>
                    <aside className="forum_aside_sidebar">
                        <h3>Tópicos</h3>
                        {forumTopic.map((topic) => {
                            return (
                                <ul>
                                    <li><a href="">{topic.label}</a></li>
                                </ul>
                            );
                        })}
                    </aside>
                   
                </div>
                <a className="back-to-top" href="#forum">➜</a>
            </div>
        </Layout>
    );
}
export default Forum;
