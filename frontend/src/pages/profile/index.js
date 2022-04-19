import "./styles.scss";
import Input from "../../components/Input";
import PencilIcon from "../../components/PencilIcon";
import { useEffect, useState } from "react";
import CheckIcon from "../../components/CheckIcon";

function Profile() {
  let initialValues = {
    nome: "Emerson Teles",
    universidade: "UnB",
    email: "emersonteles@gmail.com",
  };
  //TODO: PEGAR MATERIAS DA API E PREENCHER ESSE ARRAY
  let materias = ["MDS", "GPEQ", "PED"];
  let [disabled, setDisabled] = useState("disabled");
  const [formValues, setFormValues] = useState(initialValues);
  let icon;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  if (disabled === "disabled") {
    icon = <PencilIcon />;
  } else {
    icon = <CheckIcon />;
  }
  const onclick = () => {
    disabled === "" ? setDisabled("disabled") : setDisabled("");
  };

  //TODO: Popular Informações vindas do banco de dados
  useEffect(() => {}, []);

  //TODO: Função de Deletar Conta, chamar delete da api e redirecionar para login
  const deleteAccount = () => {
    console.log("Deletar Conta");
  };

  return (
    <div className="profile">
      <div className="profile_card-profile">
        <div className="profile_icon-pencil">
          <div onClick={onclick}>{icon}</div>
        </div>
        <div className="profile_card-inputs">
          <Input
            title="Nome"
            name="nome"
            onChange={handleChange}
            disabled={disabled}
            value={formValues.nome}
          />
          <Input
            title="E-mail"
            name="email"
            onChange={handleChange}
            disabled={disabled}
            value={formValues.email}
          />
          <Input
            title="Universidade"
            name="universidade"
            onChange={handleChange}
            disabled={disabled}
            value={formValues.universidade}
          />
          <div className="disciplinas">
            <p>Disciplinas</p>
            <div className="list-disciplinas">
              {materias.map((materia, index) => (
                <div key={index} className="materia-box">
                  {materia}
                </div>
              ))}
            </div>
          </div>
        </div>
        {disabled === "" ? (
          <div onClick={deleteAccount} className="profile_card-delete-account">
            Excluir Conta
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
