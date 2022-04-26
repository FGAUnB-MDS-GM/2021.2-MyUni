import { useImperativeHandle, forwardRef, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Modal from "../modal";
import Input from "../Input";
import "./styles.scss";

function NotebookModal({ notebook }, ref) {
  const defaultInputValues = {
    title: "",
    note: "",
  };
  const [notebookModal, setNotebookModal] = useState(false);
  const [values, setValues] = useState(defaultInputValues);
  function handleChange(event) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }
  useImperativeHandle(ref, () => ({
    handleOpenModal: () => {
      console.log("imperative");
      setNotebookModal(true);
    },
  }));

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
                value={values.title}
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
                value={values.note}
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
      </div>
    </Modal>
  );
}

export default forwardRef(NotebookModal);
