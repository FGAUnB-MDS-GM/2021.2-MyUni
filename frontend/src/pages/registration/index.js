import FormRegistration from "../../components/formRegistration";
import MyUni from "../../assets/MyUni Logo.svg";
import "./styles.scss";

function Registration() {
  return (
    <div className="registration">
      <div className="registration_mobileMode">
        <img
          src={MyUni}
          alt="My Uni Logo"
          className="registration_mobileMode_logo"
        />
      </div>
      <section className="registration_section">
        <img
          src={MyUni}
          alt="My Uni Logo"
          className="registration_section_logo"
        />
        <h2 className="registration_section_description">
          My Uni, uma aplicação desenvolvida por alunos para alunos. Aqui você
          consegue organizar a sua rotina acadêmica e compartilhar conhecimento.
        </h2>
      </section>
      <FormRegistration />
    </div>
  );
}
export default Registration;
