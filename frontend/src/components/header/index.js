import { useAuth } from "../../hooks/useAuth";
import Logout from "../../assets/LogOut.svg";
import "./styles.scss";
function Header() {
  const { handleLogout } = useAuth();

  return (
    <header className="header">
      <section className="header_group">
        <button className="header_group_profileButton">
          <h1><a href="/profile">Emerson Teles</a></h1>
        </button>
        <button onClick={handleLogout} className="header_group_logoutButton">
          <img src={Logout} alt="Logout button" />
        </button>
      </section>
    </header>
  );
}
export default Header;
