import { useImperativeHandle, forwardRef, useState } from "react";
import Modal from "../modal";
import Input from "../Input";
import "./styles.scss";


function NotebookModal({ notebook }, ref) {
  const [notebookModal, setNotebookModal] = useState(false);

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
          <div className="notebookModal_close_button">
            <button onClick={() => setNotebookModal(false)}>✖</button>
          </div>
          <div class="notebookModal_content">
            <header className="notebookModal_content_header">
              <h1><Input
                name="titulo"
                type="textarea"
                placeholder="Titulo"
                // value={values.description}
                // onChange={(event) => handleChange(event)}
              /></h1>
              
            </header>
            <main className="notebookModal_content_main">
              <Input
                name="nota"
                type="textarea"
                placeholder="Nota"
                // value={values.description}
                // onChange={(event) => handleChange(event)}
              />
            </main>
          </div>
        </article>
      </div>
    </Modal>
  );
}

export default forwardRef(NotebookModal);
