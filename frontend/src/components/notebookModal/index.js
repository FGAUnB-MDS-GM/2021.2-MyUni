import { useImperativeHandle, forwardRef, useState } from "react";
import Modal from "../modal";
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
      <div onClick={() => setNotebookModal(false)} className="modalContainer">
        <article className="notebookModal">Modal</article>
      </div>
    </Modal>
  );
}

export default forwardRef(NotebookModal);
