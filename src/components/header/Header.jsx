import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="header__container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo">RollingVet</h2>
        </Link>
        <div className="header__container__links">
          <Link
            to="/login"
            className="header__container__links-links header__button"
          >
            Login
          </Link>
          <Link to="/planes" className="header__container__links-links">
            Planes
          </Link>
          <Link to="/registro" className="header__container__links-links">
            Registro
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
