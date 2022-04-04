import "./styles.scss";
import Logout from "../../assets/LogOut.svg";
import Logo from "../../assets/MyUni Logo.svg";

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
        <input className="banner_search" type="search" placeholder="Pesquisa" />
      </section>
      <section className="home_content">
        <article className="card"></article>
        <article className="card"></article>
      </section>
    </div>
  );
}
export default Home;
