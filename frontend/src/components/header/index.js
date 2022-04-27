import { useAuth } from "../../hooks/useAuth";
import Logout from "../../assets/LogOut.svg";
import { useLocation } from "react-router-dom";
import "./styles.scss";
import Loader from "../Loader";
import {useEffect, useState} from "react";
import {api} from "../../service/api";

function Header({ title }) {

  const [name, setName] = useState(null)
  function getInfoUser(){
    if (localStorage.getItem("nameUser")){
      setName(localStorage.getItem("nameUser"))
    } else {
      api.get('/user', {
        headers: {
          'Authorization': localStorage.getItem("token")
        }
      }).then((dado) => {
        localStorage.setItem("nameUser", dado.data.name)
        setName(localStorage.getItem("nameUser"))
      })
    }
  }
  useEffect(()=>{
    getInfoUser()
  }, [])
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
              className={location.pathname === "/notebook" ? "navActive" : ""}
              href="/notebook"
            >
              Caderno Digital
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
        </ul>
      </nav>

      <section className="header_group">
        {name?<a className="header_group_profileButton" href="/profile">
          {name}
        </a>:<Loader/>}
        <button onClick={handleLogout} className="header_group_logoutButton">
          <img src={Logout} alt="Logout button" />
          <span>Logout</span>
        </button>
      </section>
    </header>
  );
}
export default Header;
