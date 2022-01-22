import React from "react";
import { Link } from "react-router-dom";
import "./navItem.css";

const NavItem = (props) => {
    let icono = props.icono;
  if (props.active) {
      icono+=" admin__nav-item-icon-active"
    return (
      <Link to={props.enlace} className="admin__nav-item admin__nav-item-active ps-3 py-2">
        <i className={icono}></i>
        <p className="my-0 ms-2 admin__nav-item__titulo-active">{props.titulo}</p>
      </Link>
    );
  }
  else icono+=" admin__nav-item-icon";
  return (
    <Link to={props.enlace} className="admin__nav-item ps-3 py-2">
      <i className={icono}></i>
      <p className="my-0 ms-2 admin__nav-item__titulo">{props.titulo}</p>
    </Link>
  );
};

export default NavItem;
