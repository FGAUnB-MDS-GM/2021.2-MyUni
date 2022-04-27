import {useImperativeHandle, forwardRef, useState, useEffect} from "react";
import { XIcon } from "@heroicons/react/outline";
import Modal from "../modal";
import Input from "../Input";
import "./styles.scss";
import Button from "../Button";

function NotebookModal({ notebook }, ref) {
  const [notebookModal, setNotebookModal] = useState(false);
  const [values, setValues] = useState(null);
  const [edited, setEdited] = useState(false)
  function handleChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    setEdited(true);
  }
  useImperativeHandle(ref, () => ({
    handleOpenModal: (notebook) => {
      console.log("imperative");
      setValues(notebook)
        console.log(notebook)
      setNotebookModal(true);
    },
  }));

  useEffect(()=>{

  }, [values])

  if (!notebookModal) return null;

  return (
    <Modal>
      <div className="modalContainer">
        <article className="notebookModal">
          <button
            className="notebookModal_close_button"
            onClick={() => setNotebookModal(false)}
          >
            <XIcon />
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
                name="description"
                type="textarea"
                placeholder="Nota"
                value={values?.description}
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
                  <Button label="Confirmar Edição de Nota"/>
              </div>
              : null}
      </div>
    </Modal>
  );
}

export default forwardRef(NotebookModal);
