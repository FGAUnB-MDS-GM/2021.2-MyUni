import "./styles.scss";
import Input from "../Input";
import Button from "../Button";

function FormLogin() {
  function onSubmit(event) {
    event.preventDefault();
    console.log("submit");
  }
  return (
    <form className="formLogin">
      <h1 className="formLogin_title">SEJA BEM VINDO!</h1>
      <div className="formLogin_group">
        <Input type="email" title="Email:" placeholder="matricula@aluno.unb" />
        <Input type="password" title="Senha:" placeholder="********" />
      </div>
      <div className="formLogin_group">
        <Button label="Entrar" onClick={onSubmit} />
        <a href="/cadastro" className="formLogin_signup">
          Não tem uma conta? <br /> Faça a sua agora!
        </a>
      </div>
    </form>
  );
}
export default FormLogin;
