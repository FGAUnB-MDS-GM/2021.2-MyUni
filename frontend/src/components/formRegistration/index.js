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
          <Input type="text" title="Nome:" placeholder="Nome Completo" />
          <Input type="text" title="Matricula:" placeholder="193239092" />
          <select name="Curso">
            <option value="valor1">Valor 1</option>
            <option value="valor2" selected>Valor 2</option>
            <option value="valor3">Valor 3</option>
          </select>
          <Input type="password" title="Senha:" placeholder="********" />
        </div>
        <div className="formRegistration_group">
          <Button label="Cadastrar" onClick={onSubmit} />
          <a href="/login" className="formRegistration_signup">
            <p>Clique aqui para voltar para o login</p>
          </a>
        </div>
      </form>
    );
  }
  export default FormRegistration;