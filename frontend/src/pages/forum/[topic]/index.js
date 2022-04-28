import "./styles.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/layout";
import Input from "../../../components/Input";
import api from "../../../service/api";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function TopicPage() {
  const { topic } = useParams();
  const forumTopicMockado = {
    title: "Alguem consegue me ajudar com calculo 1?",
    description:
      "Tendo em vista essa desconexão com o mundo real que os estudantes de Cálculo 1 enfrentam, mostraremos um exemplo de como essa disciplina é importante em um projeto de Engenharia.  No caso, o projeto em especial envolve a etapa da recuperação de um foguete amador. Por meio do máximo de uma função, é possível saber qual a altura máxima, denominada apogeu, será atingida pelo foguete.",
    label: "Calculo 1",
    user: "Bernardo",
    photo: "https://avatars.githubusercontent.com/u/57421498?v=4",
    responses: [
      {
        description:
          "Oi Bernardo, eu posso te ajudar, pode me chamar no privado por favor? Obrigado",
        autor: "Guilherme",
      },
      {
        description:
          "Oi Bernardo, eu posso te ajudar, pode me chamar no privado por favor? Obrigado",
        autor: "Guilherme",
      },
      {
        description:
          "Oi Bernardo, eu posso te ajudar, pode me chamar no privado por favor? Obrigado",
        autor: "Guilherme",
      },
      {
        description:
          "Oi Bernardo, eu posso te ajudar, pode me chamar no privado por favor? Obrigado",
        autor: "Guilherme",
      },
    ],
  };
  const forumDefaultValues = {
    title: "",
    description: "",
    responses: [],
  };
  const [comment, setComment] = useState(forumTopicMockado);
  const [question, setQuestion] = useState();
  const [newQuestion, setNewQuestion] = useState(true);
  const token = localStorage.getItem("token");
  const { user_id } = jwt_decode(token);
  const router = useNavigate();
  async function DeleteComment() {
    try {
      await api.delete("/comment/", {
        data: { comment_id: comment.comment_id },
      });
      toast.success("Pergunta deletada com sucesso!");
      router("/forum");
    } catch (error) {
      toast.error("Não foi possível deletar o comentário.");
      console.log(error);
    }
  }
  function handleChange(event) {
    const { value } = event.target;
    setQuestion(value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/comment/reply", {
        forum_id: "626a17a840619b67935aa831",
        comment_id: topic,
        reply: question,
      });
      setQuestion("");
      setNewQuestion(!newQuestion);
    } catch (error) {
      console.log(error);
    }
  }
  async function getInitialData() {
    try {
      const response = await api.get(
        `/comment/626a17a840619b67935aa831/${topic}`
      );
      setComment(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getInitialData();
  }, [newQuestion]);
  return (
    <Layout>
      <div className="forumTopic">
        <div class="forumTopic_content">
          <div className="forumTopic_content_question">
            <div className="forumTopic_content_header">
              <h1>{comment.title}</h1>
            </div>
            <div className="forumTopic_content_main">
              <p>{comment.comment}</p>
            </div>
          </div>
          <form
            className="forumTopic_content_form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <Input
              type="textarea"
              value={question}
              placeholder="Responder"
              onChange={(event) => handleChange(event)}
              style={{ fontSize: "1em" }}
            />
            <div>
              <button type="submit" className="forumTopic_content_form_submit">
                Responder
              </button>
              {comment.user_id === user_id && (
                <button
                  type="button"
                  onClick={() => {
                    DeleteComment();
                  }}
                  className="forumTopic_content_form_delete"
                >
                  Apagar
                </button>
              )}
            </div>
          </form>
          <ul className="forumTopic_replies">
            {comment.replies?.map((reply) => {
              return (
                <li className="forumTopic_replies_reply">
                  <div className="forum_article_content-top">
                    <img
                      className="forum_article_content-top_photo"
                      src="https://i.ibb.co/zrhG1X3/default-avatar.jpg"
                      alt="user profile"
                    />
                    <div className="forum_article_content-top_text">
                      <p>{reply.comment}</p>
                    </div>
                  </div>
                  <div className="forum_article_content-bottom">
                    <div>
                      <h3>{reply.username}</h3>
                    </div>
                    <div></div>
                    <div>
                      <h3>{new Date(reply.created_at).toLocaleDateString()}</h3>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
