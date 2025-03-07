// filepath: /C:/Users/manso/OneDrive/Bureau/ArgentBank-Frontend/src/components/Header.jsx
// filepath: /C:/Users/manso/OneDrive/Bureau/ArgentBank-Frontend/ArgentBank/src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png" // Utilisation de l'URL de l'image
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Header;
