import "./styles.scss";
import Input from "../Input";
import Button from "../Button";

function FormRegistration() {
    function onSubmit(event) {
      event.preventDefault();
      console.log("submit");
    }
    return (
      <form className="formRegistration">
        <h1 className="formRegistration_title">Faça seu Cadastro!</h1>
        <div className="formRegistration_group"> 
          <Input type="text" title="Nome:" placeholder="José" />
          <Input type="text" title="Sobrenome:" placeholder="Silva" />
          <Input type="email" title="Email:" placeholder="aluno@gmail.com" />
          <Input type="password" title="Senha:" placeholder="********" />
          <Input type="password" title="Confirmar senha:" placeholder="********" />  
        </div>
        <div className="formRegistration_group">
          <Button label="Cadastrar" onClick={onSubmit} />
          <a href="/login" className="formRegistration_signup">
            <p>ja tem uma conta? <br /> Faça login</p>
          </a>
        </div>
      </form>
    );
  }
  export default FormRegistration;