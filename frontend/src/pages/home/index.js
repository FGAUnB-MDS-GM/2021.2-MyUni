import "./styles.scss";
import Logout from "../../assets/LogOut.svg";
import Logo from "../../assets/MyUni Logo.svg";
import CardernoDigitalImg from "../../assets/cadernodigital.png";
import ForumImg from "../../assets/forum.png";
function Home() {
  return (
    <div className="home">
      <header className="header">
        <section className="header_group">
          <button className="header_group_profileButton">
            <h1>Emerson Teles</h1>
          </button>
          <button className="header_group_logoutButton">
            <img src={Logout} alt="Logout button" />
          </button>
        </section>
      </header>
      <section className="banner">
        <img className="banner_logo" src={Logo} alt="MyUni Logo" />
      </section>
      <section className="home_content">
        <article className="card">
          <img
            className="card_icon"
            src={CardernoDigitalImg}
            alt="caderno digital icone"
          />
          <h1 className="card_title">Caderno Digital</h1>
        </article>
        <article className="card">
          <img className="card_icon" src={ForumImg} alt="forum icone" />
          <h1 className="card_title">Fórum</h1>
        </article>
      </section>
    </div>
  );
}
export default Home;
