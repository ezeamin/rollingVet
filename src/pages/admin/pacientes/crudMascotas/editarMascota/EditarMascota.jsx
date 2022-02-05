import React from "react";
import Navegacion from "../../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../../js/adminResize";
import PanelEditarMascota from "../../../../../components/admin/pacientes/panelEditarMascota/PanelEditarMascota";
import { useNavigate } from "react-router-dom";

const EditarMascota = (props) => {
  const url = window.location.href;
  const urlSplit = url.split("/");
  let dni;
  const codigoMascota = urlSplit[urlSplit.length - 1];
  if(url.includes("admin")){
    dni = urlSplit[urlSplit.length - 3];
  }
  else{
    dni = props.user.dni
  }

  const navigate = useNavigate();

  const testAuth = props.testAuth;

  React.useEffect(() => {
    testAuth();

    window.addEventListener("resize", resize);
  }, [testAuth]);
  
  React.useEffect(() => {
    if (!props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated,navigate]);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion
          setIsAuthenticated={props.setIsAuthenticated}
          setIsAdmin={props.setIsAdmin}
          isAdmin={props.isAdmin}
          user={props.user}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelEditarMascota codigoMascota={codigoMascota} dni={dni}/>
      </div>
    </div>
  );
};

export default EditarMascota;
