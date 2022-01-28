import React from "react";
import PanelNuevaCita from "../../../../components/admin/citas/panelNuevaCita/PanelNuevaCita";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import { useNavigate } from "react-router-dom";

const NuevaCita = (props) => {
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
        <PanelNuevaCita />
      </div>
    </div>
  );
};

export default NuevaCita;
