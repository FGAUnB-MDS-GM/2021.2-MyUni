import FormRegistration from "../../components/formRegistration";
import MyUni from "../../assets/MyUni Logo.svg";
import "./styles.scss";

function Registration() {
  return (
    <div className="registrationPage">
        <div className="registrationPage_mobileMode">
            {/*ADICIONAR COMPONENTE DESCRIÇÂO MOBILE*/}
        </div>
        <section className="registrationPage_section">
            <img src={MyUni} alt="My Uni Logo" className="registrationPage_section_logo"/>
            <h2 className="registrationPage_section_description">
                My Uni, uma aplicação desenvolvida por alunos para alunos. Aqui você
                consegue organizar a sua rotina acadêmica e compartilhar conhecimento.
            </h2>
        </section>
        <FormRegistration/>
    </div>
  );
}
export default Registration;