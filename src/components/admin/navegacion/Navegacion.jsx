import React from "react";
import { Link } from "react-router-dom";
import "./navegacion.css";
import NavItem from "./navItem/Nav-item";
import { useNavigate } from "react-router-dom";

const Navegacion = (props) => {
  const navigate = useNavigate();

  const opciones = [
    {
      titulo: "Resumen",
      icono: "fas fa-chart-line",
      enlace: "/admin",
      active: window.location.pathname === "/admin",
    },
    {
      titulo: "Citas",
      icono: "fas fa-calendar-alt",
      enlace: "/admin/citas",
      active: window.location.pathname.includes("/admin/citas"),
    },
    {
      titulo: "Pacientes",
      icono: "fas fa-user-injured",
      enlace: "/admin/pacientes",
      active: window.location.pathname.includes("/admin/pacientes"),
    },
    {
      titulo: "Veterinarios",
      icono: "fas fa-user-md",
      enlace: "/admin/veterinarios",
      active: window.location.pathname.includes("/admin/veterinarios"),
    },
    {
      titulo: "Precios",
      icono: "fas fa-dollar-sign",
      enlace: "/admin/precios",
      active: window.location.pathname.includes("/admin/precios"),
    },
    {
      titulo: "Salir",
      icono: "fas fa-sign-out-alt",
      enlace: "",
      active: false,
    },
  ];

  React.useEffect(() => {
    document.getElementsByClassName("admin__nav-bg")[0].addEventListener("click", () => { 
      document.getElementsByClassName("admin__nav-container")[0].style.transform = "translateX(-100%)";
      setTimeout(() => {
        document.getElementsByClassName("admin__nav")[0].style.display = "none";
      },300);
    });
  }, []);

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "DELETE",
    });
    props.setIsAuthenticated(false);
    props.setIsAdmin(false);
    navigate("/");
  }

  return (
    <div>
      <div className="admin__nav-bg"></div>
      <div className="container admin__nav-container">
        <div className="admin__logo">
          <Link to="/">
            <img src="/img/favicon.png" alt="logo RollingVet" />
          </Link>
        </div>
        <div className="admin__user my-4">
          <div className="admin__user-foto">
            <img
              src="/img/index/profesionales/ezequiel.png"
              alt="Ezequiel Amin"
            />
          </div>
          <div className="admin__user-name">
            <h4>Ezequiel</h4>
            <p>admin</p>
          </div>
        </div>
        <div className="admin__menu">
          <h4 className="ms-3">Menu</h4>
          {opciones.map((opcion, index) => (
            <NavItem key={index} {...opcion} handleLogout={handleLogout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navegacion;
