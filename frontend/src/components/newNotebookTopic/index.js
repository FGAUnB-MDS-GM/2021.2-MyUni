import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import "./styles.scss";
import api from "../../service/api";
import {toast} from "react-toastify";

export default function NewForumTopic() {
  const defaultInputValues = {
    title: "",
    note: "",
    topic: "",
  };
  const [values, setFormValues] = useState(defaultInputValues);

  function adicionarAnotacao(){
      api.post('note', values).then(()=>{
              document.location.reload(true)
      }
      ).catch((error)=>{
          toast.error("Não foi possível adicionar essa anotação")
      })
  }
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
      <h3>Adicionar uma nota</h3>
      <Input 
        name="title" 
        type="textarea" 
        placeholder="Titulo" 
        value={values.title}
        onChange={(event) => handleChange(event)}
      />
      <Input 
        name="note"
        type="textarea" 
        placeholder="Descrição" 
        value={values.note}
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
        <button onClick={adicionarAnotacao} className="buttonAdd">Adicionar</button>
      </div>
    </form>
  );
}
