import { createContext } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext("");

export default function Auth() {
  const router = useNavigate();
  async function handleLogin(email, password) {
    try {
      const {
        data: { jwt: token },
      } = await api.post("/user/login", {
        email,
        password,
      });
      localStorage.setItem("token", token);
      router("/home");
    } catch (error) {
      console.log(error.message);
      toast.error("Não foi possível realizar o login");
    }
  }
  function handleLogout() {
    localStorage.removeItem("token");
    router("/login");
  }
  async function handleRegistration(name, email, password) {
    try {
      const { data: token } = await api.post("/user", {
        name,
        email,
        password,
        college: "UnB",
        user_type: "0",
      });
      localStorage.setItem("token", token);
      router("/home");
    } catch (error) {
      console.log(error.message);
      toast.error("Não foi possível realizar o login");
    }
  }
  return { handleLogin, handleLogout, handleRegistration };
}

export function AuthContextProvider({ children }) {
  const { handleLogin, handleLogout, handleRegistration } = Auth();
  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        handleRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
