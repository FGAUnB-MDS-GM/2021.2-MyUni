import "./styles.scss";
import Input from "../../components/Input";
import PencilIcon from "../../components/PencilIcon";
import {useEffect, useState} from "react";
import CheckIcon from "../../components/CheckIcon";
import api from "../../service/api";
import Header from "../../components/header";
import {useNavigate} from "react-router-dom";

function Profile() {
    const router = useNavigate();
    let [novaMateria, setNovaMateria] = useState("");
    let [materias, setMaterias] = useState([]);
    let [disabled, setDisabled] = useState(true);
    const [formValues, setFormValues] = useState(null);

    function addMateria() {
        if (!disabled) {
            materias.push(novaMateria);
            setMaterias(materias)
            setNovaMateria("")
        }
    }

    function handleChangeMateria(event) {
        setNovaMateria(
            event.target.value
        )
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const toggleIcon = () => {
        setDisabled(!disabled);
    };

    function submitData() {
        formValues.disciplines = materias;
        api.put('/user', formValues).then(() => {
            document.location.reload(true)
        }).catch(error => console.log(error))
    }

    async function getInfoUser() {
        try {
            const response = await api.get("/user");
            setFormValues(response.data);
            setMaterias(response.data.disciplines)
        } catch (error) {
            console.log(error);
        }
    }

    function retirarMateria(indexMat) {
        if (!disabled) {
            const newList = materias.filter((item, index) => index !== indexMat);

            setMaterias(newList);
        }
    }

    useEffect(() => {
        getInfoUser();
    }, []);
    const deleteAccount = () => {
        api.delete(
            '/user'
        ).then(()=>{
                localStorage.removeItem('token');
                router("/home");
        }
        ).catch((error)=>console.log(error))
    };

    return (
        <div>
            <Header/>
            <div className="profile">
                <div className="profile_card-profile">
                    <div className="profile_icon-pencil">
                        {disabled ? (
                            <div onClick={toggleIcon}>
                                <PencilIcon/>
                            </div>
                        ) : (
                            <div onClick={submitData}>
                                <CheckIcon/>
                            </div>
                        )}
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
                                    <div key={index} className="flex">
                                        <div className="materia-box">
                                            {materia}
                                        </div>
                                        {!disabled &&
                                        <div className="materia-box" onClick={() => retirarMateria(index)}>
                                            X
                                        </div>}
                                    </div>
                                ))}
                                {!disabled && <div className="add-materia">
                                    <Input style={{
                                        background: "white"
                                    }} onChange={handleChangeMateria} value={novaMateria} disabled={disabled}
                                           placeholder="Nova Materia"/>
                                    <div className="button_add" onClick={addMateria}>
                                        +
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                    {!disabled ? (
                        <div onClick={deleteAccount} className="profile_card-delete-account">
                            Excluir Conta
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Profile;
