import React from "react";
import "./navegacion.css";
import NavItem from "./navItem/Nav-item";

const Navegacion = () => {
  const opciones = [
    {
      titulo: "Resumen",
      icono: "fas fa-chart-line admin__nav-item-icon",
      enlace: "/admin/resumen",
    },
    {
      titulo: "Citas",
      icono: "fas fa-calendar-alt admin__nav-item-icon",
      enlace: "/admin/citas",
    },
    {
      titulo: "Pacientes",
      icono: "fas fa-user-injured admin__nav-item-icon",
      enlace: "/admin/pacientes",
    },
    {
      titulo: "Médicos",
      icono: "fas fa-user-md admin__nav-item-icon",
      enlace: "/admin/medicos",
    },
  ];

  return (
    <div className="container py-3">
      <div className="admin__logo">
        <img src="img/favicon.png" alt="logo RollingVet" />
      </div>
      <div className="admin__user my-4">
        <div className="admin__user-foto">
          <img src="img/index/profesionales/ezequiel.png" alt="Ezequiel Amin" />
        </div>
        <div className="admin__user-name">
          <h4>Ezequiel</h4>
          <p>admin</p>
        </div>
      </div>
      <div className="admin__menu">
          <h4 className="ms-3">Menu</h4>
          {
            opciones.map((opcion,index) => (
                <NavItem key={index} {...opcion} />
            ))
          }
      </div>
    </div>
  );
};

export default Navegacion;
