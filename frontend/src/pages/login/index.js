import FormLogin from "../../components/formLogin";
import MyUni from "../../assets/MyUni Logo.svg";
import "./styles.scss";

function Login() {
  return (
    <div className="login">
      <div className="registration_mobileMode">
        <img
          src={MyUni}
          alt="My Uni Logo"
          className="registration_mobileMode_logo"
        />
      </div>
      <section className="login_section">
        <img src={MyUni} alt="My Uni Logo" className="login_section_logo" />
        <h2 className="login_section_description">
          My Uni, uma aplicação desenvolvida por alunos para alunos. Aqui você
          consegue organizar a sua rotina acadêmica e compartilhar conhecimento.
        </h2>
      </section>
      <FormLogin />
    </div>
  );
}
export default Login;
