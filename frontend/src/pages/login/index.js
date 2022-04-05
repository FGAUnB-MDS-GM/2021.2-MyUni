import FormLogin from "../../components/formLogin";
import MyUni from "../../assets/MyUni Logo.svg";
import "./styles.scss";

function Login() {
  return (
    <div className="loginPage">
        <div className="loginPage_mobileMode">
            {/*ADICIONAR COMPONENTE DESCRIÇÂO MOBILE*/}
        </div>
        <section className="loginPage_section">
            <img src={MyUni} alt="My Uni Logo" className="loginPage_section_logo"/>
            <h2 className="loginPage_section_description">
                My Uni, uma aplicação desenvolvida por alunos para alunos. Aqui você
                consegue organizar a sua rotina acadêmica e compartilhar conhecimento.
            </h2>
        </section>
        <FormLogin/>
    </div>
  );
}
export default Login;
