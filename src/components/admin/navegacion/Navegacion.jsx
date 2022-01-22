import React from "react";
import { Link } from "react-router-dom";
import "./navegacion.css";
import NavItem from "./navItem/Nav-item";

const Navegacion = () => {
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
      active: window.location.pathname === "/admin/citas",
    },
    {
      titulo: "Pacientes",
      icono: "fas fa-user-injured",
      enlace: "/admin/pacientes",
      active: window.location.pathname === "/admin/pacientes",
    },
    {
      titulo: "Médicos",
      icono: "fas fa-user-md",
      enlace: "/admin/medicos",
      active: window.location.pathname === "/admin/medicos",
    },
    {
      titulo: "Precios",
      icono: "fas fa-dollar-sign",
      enlace: "/admin/precios",
      active: window.location.pathname === "/admin/precios",
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
            <NavItem key={index} {...opcion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navegacion;
