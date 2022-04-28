import {useImperativeHandle, forwardRef, useState, useEffect} from "react";
import {XIcon} from "@heroicons/react/outline";
import Modal from "../modal";
import Input from "../Input";
import "./styles.scss";
import Button from "../Button";
import api from "../../service/api";
import {toast} from "react-toastify";
import {TrashIcon} from "@heroicons/react/solid";

function NotebookModal({notebook}, ref) {
    const [notebookModal, setNotebookModal] = useState(false);
    const [values, setValues] = useState(null);
    const [edited, setEdited] = useState(false)

    function deleteNote() {
        api.delete('note', {
            data: {
                note_id: values.note_id
            }
        }).then(() => {
                document.location.reload(true)
            }
        ).catch((error)=>{
            toast.error("Nao foi possivel excluir nota");
        })
    }

    function confirmarEdicao() {
        api.put('note', values).then(() => {
            document.location.reload(true);
        }).catch(() => {
                toast.error("Não foi possível editar a anotação");
            }
        )
    }

    function handleChange(event) {
        const {name, value} = event.target;

        setValues({...values, [name]: value});
        setEdited(true);
    }

    useImperativeHandle(ref, () => ({
        handleOpenModal: (notebook) => {
            setValues(notebook)
            setNotebookModal(true);
        },
    }));

    useEffect(() => {

    }, [values])

    if (!notebookModal) return null;

    return (
        <Modal>
            <div className="modalContainer">
                <article className="notebookModal">
                    <button onClick={() => deleteNote()} className="notebookModal_clean_note">
                        <TrashIcon/>
                    </button>
                    <button
                        className="notebookModal_close_button"
                        onClick={() => setNotebookModal(false)}
                    >
                        <XIcon/>
                    </button>
                    <div class="notebookModal_content">
                        <header className="notebookModal_content_header">
                            <Input
                                name="title"
                                type="textarea"
                                placeholder="Título"
                                value={values?.title}
                                onChange={(event) => handleChange(event)}
                                style={{
                                    background: "#fff",
                                    fontSize: "1.6em",
                                    fontWeight: 700,
                                    height: "3.4rem",
                                    minHeight: "3.4rem",
                                    maxHeight: "6rem",
                                }}
                            />
                        </header>
                        <main className="notebookModal_content_main">
                            <Input
                                name="note"
                                type="textarea"
                                placeholder="Nota"
                                value={values?.note}
                                onChange={(event) => handleChange(event)}
                                style={{
                                    background: "#fff",
                                    fontSize: "1.2em",
                                    height: "100%",
                                    minHeight: "100%",
                                    resize: "none",
                                }}
                            />
                        </main>
                    </div>
                </article>
                {edited ?
                    <div className="notebookModal_confirm_button">
                        <Button onClick={confirmarEdicao} label="Confirmar Edição de Nota"/>
                    </div>
                    : null}
            </div>
        </Modal>
    );
}

export default forwardRef(NotebookModal);
