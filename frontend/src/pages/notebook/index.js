import { useRef } from "react";
import Layout from "../../components/layout";
import NewNotebookTopic from "../../components/newNotebookTopic";
import NotebookTopic from "../../components/notebookTopic";
import "./styles.scss";
import NotebookModal from "../../components/notebookModal";

function Notebook() {
  const modalRef = useRef();

  function openNotebookModal() {
    modalRef.current.handleOpenModal();
  }

  const notebookTopic = [
    {
      title: "Anotações da aula",
      description:
        "Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019Conteúdo de Calculo 1 do dia 27/07/2019",
      label: "Calculo 1",
    },
    {
      title: "Anotações da aula",
      description: "Conteúdo de DIAC do dia 27/07/2019",
      label: "DIAC",
    },
    {
      title: "Anotações da aula",
      description: "Conteúdo de Calculo 1 do dia 27/07/2019",
      label: "Calculo 1",
    },
    {
      title: "Anotações da aula",
      description: "Conteúdo de DIAC do dia 27/07/2019",
      label: "DIAC",
    },
  ];
  return (
    <Layout title="Caderno Digital">
      <div id="notebook" className="notebook">
        <div className="notebook_content">
          {notebookTopic.map((topic) => {
            return (
              <NotebookTopic
                onClick={() => {
                  console.log("clicked");
                  openNotebookModal();
                }}
                photo={topic.photo}
                title={topic.title}
                description={topic.description}
                user={topic.user}
                label={topic.label}
              />
            );
          })}
        </div>
        <div className="notebook_aside">
          <NewNotebookTopic />
          <aside className="notebook_aside_sidebar">
            <h3>Tópicos</h3>
            {notebookTopic.map((topic) => {
              return (
                <ul>
                  <li>
                    <a href="">{topic.label}</a>
                  </li>
                </ul>
              );
            })}
          </aside>
        </div>
      </div>
      <NotebookModal notebook="012" ref={modalRef} />
    </Layout>
  );
}
export default Notebook;
