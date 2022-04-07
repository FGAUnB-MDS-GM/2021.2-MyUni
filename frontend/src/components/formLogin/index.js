import "./styles.scss";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onSubmit(event) {
    event.preventDefault();
  }
  return (
    <form className="formLogin">
      <h1 className="formLogin_title">SEJA BEM VINDO!</h1>
      <div className="formLogin_group">
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          type="email"
          title="Email:"
          placeholder="matricula@aluno.unb"
        />
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          name="password"
          type="password"
          title="Senha:"
          placeholder="********"
        />
      </div>
      <div className="formLogin_group">
        <Button label="Entrar" onClick={onSubmit} />
        <a href="/registration" className="formLogin_signup">
          Não tem uma conta? <br /> Faça a sua agora!
        </a>
      </div>
    </form>
  );
}
export default FormLogin;
