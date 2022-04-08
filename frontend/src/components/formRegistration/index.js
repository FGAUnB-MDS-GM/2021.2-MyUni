import "./styles.scss";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
function FormRegistration() {
  const initialFormValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);
  const { handleRegistration } = useAuth();
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
    handleRegistration(formValues.name, formValues.email, formValues.password);
  }
  return (
    <form className="formRegistration" onSubmit={onSubmit}>
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
          placeholder="matricula@aluno.unb.br"
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
      <div className="formRegistration_submit">
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
