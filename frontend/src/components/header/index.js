import { useAuth } from "../../hooks/useAuth";
import Logout from "../../assets/LogOut.svg";
import "./styles.scss";

function Header({title}) {
  const { handleLogout } = useAuth();

  return (
    <header className="header">
      <section className="current_page">
        <h1>{title}</h1>
      </section>
      <section className="header_group">
        <button className="header_group_profileButton">
          <h2><a href="/profile">Emerson Teles</a></h2>
        </button>
        <button onClick={handleLogout} className="header_group_logoutButton">
          <img src={Logout} alt="Logout button" />
          <span>Logout</span>
        </button>
      </section>
    </header>
  );
}
export default Header;
