import Layout from "../../../components/layout";
import { useParams } from "react-router-dom";
export default function TopicPage() {
  const { topic } = useParams();

  return (
    <Layout>
      <h1>{topic}</h1>
    </Layout>
  );
}
