import { useImperativeHandle, forwardRef, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import Modal from "../modal";
import Input from "../Input";
import "./styles.scss";

function ForumModal({ forum }, ref) {
    const defaultInputValues = {
      title: "",
      note: "",
    };
    const [forumModal, setForumModal] = useState(false);
    const [values, setValues] = useState(defaultInputValues);
    function handleChange(event) {
      const { name, value } = event.target;
  
      setValues({ ...values, [name]: value });
    }
    useImperativeHandle(ref, () => ({
      handleOpenModal: () => {
        console.log("imperative");
        setForumModal(true);
      },
    }));
  
    if (!forumModal) return null;
  
    return (
      <Modal>
        <div className="forumModalContainer">
          <article className="forumModal">
            <button
              className="forumModal_close_button"
              onClick={() => setForumModal(false)}
            >
              <XIcon />
            </button>
            <div class="forumModal_content">
              <div className="question">
                <header className="forumModal_content_header">
                  <h1>Pergunta do Forum?</h1>
                </header>
                <main className="forumModal_content_main">
                  <p>Descrição da Pergunta</p>
                </main>
              </div>
              <div className="response">
                
              </div>
            </div>
          </article>
        </div>
      </Modal>
    );
  }
  
  export default forwardRef(ForumModal);
  