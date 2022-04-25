import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./styles.scss";

export default function NewForumTopic() {
  const defaultInputValues = {
    title: "",
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
    <form className="notebook_aside_form" onSubmit={handleSubmit}>
      <h3>Adicionar um notebook</h3>
      <Input 
        name="title" 
        type="textarea" 
        placeholder="Titulo" 
        value={values.title}
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
        placeholder="Tópico" 
        value={values.topic}
        onChange={(event) => handleChange(event)}
      />
      <div className="notebook_aside_form_button">
        <Button label="Adicionar" />
      </div>
    </form>
  );
}
