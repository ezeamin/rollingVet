import React from "react";
import { Link } from "react-router-dom";
import './headerRegistro.css'

const HeaderRegistro = () => {
  return (
    <header>
      <div className="header__container headerRegistro__container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 className="logo">RollingVet</h2>
        </Link>
      </div>
    </header>
  );
};

export default HeaderRegistro;
