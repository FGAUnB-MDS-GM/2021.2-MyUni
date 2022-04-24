import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./styles.scss";

export default function NewForumTopic() {
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
  function handleSubmit(event) {
    event.preventDefault();
    //requisição para api;
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
