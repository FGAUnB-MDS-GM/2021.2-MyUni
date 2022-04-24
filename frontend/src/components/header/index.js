import { useAuth } from "../../hooks/useAuth";
import Logout from "../../assets/LogOut.svg";
import { useLocation } from "react-router-dom";
import "./styles.scss";

function Header({ title }) {
  const { handleLogout } = useAuth();
  const location = useLocation();
  return (
    <header className="header">
      <nav className="header_navbar">
        <ul>
          <li>
            <a
              className={location.pathname === "/home" ? "navActive" : ""}
              href="/home"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={location.pathname === "/forum" ? "navActive" : ""}
              href="/forum"
            >
              Fórum
            </a>
          </li>
          <li>
            <a
              className={location.pathname === "/notebook" ? "navActive" : ""}
              href="/notebook"
            >
              Caderno Digital
            </a>
          </li>
        </ul>
      </nav>

      <section className="header_group">
        <a className="header_group_profileButton" href="/profile">
          Emerson Teles
        </a>
        <button onClick={handleLogout} className="header_group_logoutButton">
          <img src={Logout} alt="Logout button" />
          <span>Logout</span>
        </button>
      </section>
    </header>
  );
}
export default Header;
