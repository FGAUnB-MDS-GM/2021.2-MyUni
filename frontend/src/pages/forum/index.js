import Layout from "../../components/layout";
import "./styles.scss";
import ForumImg from "../../assets/forum.png";

function Forum() {
    return (
       <Layout>
            <div className="forum">
                    <div class="forum_content">
                        <form class="form-busca-site">
                            <input class="btn-text-top" type="text" placeholder="Pesquisar" />
                                <div><button class="btn-buscar-top" type="submit"></button></div>
                        </form>
                        <article>
                            <h3> Alguem consegue me ajudar com calculo 1?</h3>
                            <p>Estou tentando resolver uns </p>
                        </article>
                    </div>
                </div>
        </Layout>
    );
}
export default Forum;