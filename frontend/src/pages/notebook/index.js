import {useEffect, useRef, useState} from "react";
import Layout from "../../components/layout";
import NewNotebookTopic from "../../components/newNotebookTopic";
import NotebookTopic from "../../components/notebookTopic";
import "./styles.scss";
import NotebookModal from "../../components/notebookModal";
import api from "../../service/api";
import NewForumTopic from "../../components/newForumTopic";
import {toast} from "react-toastify";
import ModalForum from "../../components/modalForum";

function Notebook() {
  let [notebookTopic, setNotebookTopic] = useState([]);

  function getNotes(){
    api.get('/note').then((dados)=>{
      setNotebookTopic(dados.data.data);
    }).catch(()=>{
      toast("Sem Anotações")
    })
  }

  useEffect(()=>{
    getNotes()
  }, [])
  const modalRef = useRef();

  function openNotebookModal(topic) {
    modalRef.current.handleOpenModal(topic);
  }

  return (
    <Layout title="Caderno Digital">
      <div id="notebook" className="notebook">
        <div className="notebook_content">
          {notebookTopic.map((topic) => {
            return (
              <NotebookTopic
                onClick={() => {
                  console.log("clicked");
                  openNotebookModal(topic);
                }}
                title={topic.title}
                description={topic.note}
                label={topic.topic}
              />
            );
          })}
        </div>
        <div className="notebook_aside">
          <NewNotebookTopic />
        </div>
      </div>
      <NewNotebookTopic/>
      <NotebookModal ref={modalRef} />
    </Layout>
  );
}
export default Notebook;
