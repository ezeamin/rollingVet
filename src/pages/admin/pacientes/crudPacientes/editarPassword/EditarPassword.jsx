import React from "react";
import "./editarPassword.css";
import { useNavigate } from "react-router-dom";
import Navegacion from "../../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import PanelEditarContraseña from "../../../../../components/admin/pacientes/panelEditarPaciente/panelEditarContraseña/PanelEditarContraseña";
import resize from "../../../../../js/adminResize";

const EditarPassword = (props) => {
  const navigate = useNavigate();

  const url = window.location.href;
  let dni;
  if (url.includes("admin")) {
    dni = url.split("/")[url.split("/").length - 2];
  } else dni = props.user.dni;

  React.useEffect(() => {
    props.testAuth(true);

    window.addEventListener("resize", resize);
  }, []);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion
          user={props.user}
          setIsAdmin={props.setIsAdmin}
          isAdmin={props.isAdmin}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <button className="btnVolver" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <NavegacionResponsive />
        <PanelEditarContraseña dni={dni} />
      </div>
    </div>
  );
};

export default EditarPassword;
