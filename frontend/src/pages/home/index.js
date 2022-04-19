import "./styles.scss";
import Logo from "../../assets/MyUni Logo.svg";
import CardernoDigitalImg from "../../assets/cadernodigital.png";
import ForumImg from "../../assets/forum.png";
import Header from "../../components/header";

function Home() {
  return (
    <div className="home">
      <Header />
      <section className="banner">
        <img className="banner_logo" src={Logo} alt="MyUni Logo" />
      </section>
      <section className="home_content">
        <article className="card">
          <a className="card_content" href="#">
            <img
              className="card_icon"
              src={CardernoDigitalImg}
              alt="caderno digital icone"
            />
            <h1 className="card_title">Caderno Digital</h1>
          </a>
        </article>
        <article className="card">
          <a className="card_content" href="/forum">
            <img className="card_icon" src={ForumImg} alt="forum icone" />
            <h1 className="card_title">Fórum</h1>
          </a>
        </article>
      </section>
    </div>
  );
}
export default Home;
