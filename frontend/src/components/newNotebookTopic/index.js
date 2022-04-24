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
    <form className="notebook_aside_form">
      <h3>Adicionar um notebook</h3>
      <Input name="titulo" type="textarea" placeholder="Titulo" />
      <Input name="descrição" type="textarea" placeholder="Descrição" />
      <Input name="topico" type="text" placeholder="Tópico" />
      <div className="notebook_aside_form_button">
        <Button label="Adicionar" />
      </div>
    </form>
  );
}
