import "./styles.scss";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";

function FormRegistration() {
  const initialFormValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  //TODO: Fazer o registro do usuário no banco
  function onSubmit(event) {
    event.preventDefault();
    console.log("submit");
  }
  return (
    <form className="formRegistration">
      <h1 className="formRegistration_title">Faça seu Cadastro!</h1>
      <div className="formRegistration_group">
        <Input
          value={formValues.name}
          onChange={handleChange}
          name="name"
          type="text"
          title="Nome:"
          placeholder="José"
        />
        <Input
          value={formValues.lastName}
          onChange={handleChange}
          name="lastName"
          type="text"
          title="Sobrenome:"
          placeholder="Silva"
        />
        <Input
          value={formValues.email}
          onChange={handleChange}
          name="email"
          type="email"
          title="Email:"
          placeholder="matricula@aluno.com"
        />
        <Input
          value={formValues.password}
          onChange={handleChange}
          name="password"
          type="password"
          title="Senha:"
          placeholder="********"
        />
        <Input
          value={formValues.confirmPassword}
          onChange={handleChange}
          name="confirmPassword"
          type="password"
          title="Confirmar senha:"
          placeholder="********"
        />
      </div>
      <div className="formRegistration_ubmit">
        <Button label="Cadastrar" onClick={onSubmit} />
        <a href="/login" className="formRegistration_signup">
          <p>
            ja tem uma conta? <br /> Faça login
          </p>
        </a>
      </div>
    </form>
  );
}
export default FormRegistration;
