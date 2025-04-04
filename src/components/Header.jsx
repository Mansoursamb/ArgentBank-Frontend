// filepath: /C:/Users/manso/OneDrive/Bureau/ArgentBank-Frontend/src/components/Header.jsx
// filepath: /C:/Users/manso/OneDrive/Bureau/ArgentBank-Frontend/ArgentBank/src/components/Header.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch({ type: "user/logout" }); // Déconnecte l'utilisateur
    navigate("/sign-in"); // Redirige vers la page de connexion
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        Argent Bank
      </Link>
      <nav>
        {token ? (
          // Si l'utilisateur est connecté, affichez "Sign Out"
          <>
            <span className="user-name">
              Welcome, {user?.firstName || "User"}
            </span>
            <button className="sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          // Sinon, affichez "Sign In"
          <Link to="/sign-in" className="sign-in-link">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
