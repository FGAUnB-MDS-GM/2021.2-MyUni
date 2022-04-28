import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import SearchInput from "../../components/searchInput";
import "./styles.scss";
import NewForumTopic from "../../components/newForumTopic";
import ForumTopic from "../../components/forumTopic";
import api from "../../service/api";

function Forum() {
  const [forum, setForum] = useState();
  const [NewQuestion, setNewQuestion] = useState(false);

  async function getInitialDate() {
    try {
      const response = await api.get("/forum");
      setForum(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInitialDate();
  }, [NewQuestion]);
  return (
    <Layout title="Fórum">
      <div id="forum" className="forum">
        <div className="forum_content">
          <SearchInput />
          {forum?.comments.map((comment) => {
            return <ForumTopic topic={comment} />;
          })}
        </div>
        <div className="forum_aside">
          <NewForumTopic
            NewQuestion={() => {
              setNewQuestion(!NewQuestion);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
export default Forum;
