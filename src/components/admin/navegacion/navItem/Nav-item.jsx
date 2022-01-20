import React from "react";
import { Link } from "react-router-dom";
import "./navItem.css";

const NavItem = (props) => {
  return (
    <Link to={props.enlace} className="admin__nav-item ps-3 py-2">
      <i className={props.icono}></i>
      <p className="my-0 ms-2 admin__nav-item__titulo">{props.titulo}</p>
    </Link>
  );
};

export default NavItem;
