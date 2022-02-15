import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./header.css";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "DELETE",
      credentials: "include",
    });

    Swal.fire({
      title: "¡Adios!",
      text: " ",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(() => {
      props.setIsAuthenticated(false);
      sessionStorage.removeItem("isFirstTime");
      if(window.location.pathname !== "/")  navigate("/");
      else window.location.reload();
    });
  };

  //autenticado
  if (props.isAuthenticated) {
    return (
      <header>
        <div className="header__container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2 className="logo">RollingVet</h2>
          </Link>
          <div className="header__container__links">
            <Link to="/planes" className="header__container__links-links">
              Planes
            </Link>
            <Link
              to="/user"
              className="header__container__links-links header__button"
            >
              Mi cuenta
            </Link>
            <button
              onClick={handleLogout}
              className="header__container__links-links header__container__links-salir"
            >
              Salir
            </button>
          </div>
        </div>
      </header>
    );
  }

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
