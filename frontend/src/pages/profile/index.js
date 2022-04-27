import "./styles.scss";
import Input from "../../components/Input";
import PencilIcon from "../../components/PencilIcon";
import { useEffect, useState } from "react";
import CheckIcon from "../../components/CheckIcon";
import {api} from "../../service/api";

function Profile() {
  //TODO: PEGAR MATERIAS DA API E PREENCHER ESSE ARRAY
  let materias = ["MDS", "GPEQ", "PED"];
  let [disabled, setDisabled] = useState("disabled");
  const [formValues, setFormValues] = useState(null);
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

  function getInfoUser(){
    api.get('/user', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then((dado) => {
      setFormValues(dado.data);
    })
  }

  //TODO: Popular Informações vindas do banco de dados
  useEffect(() => {
    getInfoUser()
  }, []);

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
            name="name"
            onChange={handleChange}
            disabled={disabled}
            value={formValues?.name}
          />
          <Input
            title="E-mail"
            name="email"
            onChange={handleChange}
            disabled={disabled}
            value={formValues?.email}
          />
          <Input
            title="Universidade"
            name="college"
            onChange={handleChange}
            disabled={disabled}
            value={formValues?.college}
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
