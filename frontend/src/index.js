import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Registration from "./pages/registration";
import Profile from "./pages/profile";
import Forum from "./pages/forum";
import ForumTopicPage from "./pages/forum/[topic]";
import Notebook from "./pages/notebook";
import { AuthContextProvider } from "./contexts/authContext";
import PrivateRoute from "./components/privateRoute";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />}></Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/forum/:topic"
            element={
              <PrivateRoute>
                <ForumTopicPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notebook"
            element={
              <PrivateRoute>
                <Notebook />
              </PrivateRoute>
            }
          />
        </Routes>

        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
