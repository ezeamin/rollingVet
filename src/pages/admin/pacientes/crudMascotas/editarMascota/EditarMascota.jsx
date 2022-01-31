import React from "react";
import Navegacion from "../../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../../js/adminResize";
import PanelEditarMascota from "../../../../../components/admin/pacientes/panelEditarMascota/PanelEditarMascota";
import { useNavigate } from "react-router-dom";

const EditarMascota = (props) => {
  const url = window.location.href;
  const urlSplit = url.split("/");
  const dni = urlSplit[urlSplit.length - 3];
  const codigoMascota = urlSplit[urlSplit.length - 1];

  const navigate = useNavigate();

  React.useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);
  
  React.useEffect(() => {
    if (!props.isAdmin) {
      navigate("/");
    }
  }, [props.isAdmin,navigate]);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion
          setIsAuthenticated={props.setIsAuthenticated}
          setIsAdmin={props.setIsAdmin}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelEditarMascota codigoMascota={codigoMascota} dni={dni} />
      </div>
    </div>
  );
};

export default EditarMascota;
