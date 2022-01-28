import React from "react";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import PanelMascotas from "../../../../components/admin/pacientes/panelMascotas/PanelMascotas";
import { useNavigate } from "react-router-dom";

const CrudMascotas = (props) => {
  const url = window.location.href;
  const urlSplit = url.split("/");
  const dni = urlSplit[urlSplit.length - 2];

  const navigate = useNavigate();
  
  React.useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);
  
  React.useEffect(() => {
    if (!props.isAdmin) {
      navigate("/");
    }
  }, [props.isAdmin]);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelMascotas dni={dni} />
      </div>
    </div>
  );
};

export default CrudMascotas;
