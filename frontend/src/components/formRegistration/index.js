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
          <div className="formRegistration_row">
            <Input type="text" title="Nome:" placeholder="José" />
            <Input type="text" title="Sobrenome:" placeholder="Silva" />
          </div>
          <Input type="text" title="Matricula:" placeholder="193239092" />
          <Input type="email" title="Email:" placeholder="aluno@aluno.com" />
          <select name="Curso">
            <option value="valor1">Valor 1</option>
            <option value="valor2" selected>Valor 2</option>
            <option value="valor3">Valor 3</option>
          </select> 
          <div className = "formRegistration_row" >
            <Input type="password" title="Senha:" placeholder="********" />
            <Input type="password" title="Confirmar senha:" placeholder="********" />
          </div>
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