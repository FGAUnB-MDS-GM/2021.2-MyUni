import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./styles.scss";
import api from "../../service/api";
import { toast } from "react-toastify";

export default function NewForumTopic({ NewQuestion }) {
  const defaultInputValues = {
    question: "",
    description: "",
    topic: "",
  };
  const [values, setFormValues] = useState(defaultInputValues);

  function handleChange(event) {
    const { value, name } = event.target;
    setFormValues({
      ...values,
      [name]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post("/comment", {
        forum_id: "626a17a840619b67935aa831",
        comment: values.description,
        title: values.question,
        topic: values.topic,
      });
      NewQuestion();
      setFormValues(defaultInputValues);
    } catch (error) {
      toast.error("não foi possível criar uma pergunta!");
      console.log(error);
    }
  }
  return (
    <form className="newForumTopic " onSubmit={handleSubmit}>
      <h3>Adicionar um tópico</h3>
      <Input
        name="question"
        type="text"
        placeholder="Pergunta"
        value={values.question}
        onChange={(event) => handleChange(event)}
      />
      <Input
        name="description"
        type="textarea"
        placeholder="Descrição"
        value={values.description}
        onChange={(event) => handleChange(event)}
      />
      <Input
        name="topic"
        type="text"
        placeholder="Topico"
        value={values.topic}
        onChange={(event) => handleChange(event)}
      />
      <div className="newForumTopic_button">
        <Button label="Adicionar" />
      </div>
    </form>
  );
}
