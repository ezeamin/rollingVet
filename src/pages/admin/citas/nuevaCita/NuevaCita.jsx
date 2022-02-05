import React from "react";
import PanelNuevaCita from "../../../../components/admin/citas/panelNuevaCita/PanelNuevaCita";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import { useNavigate } from "react-router-dom";

const NuevaCita = (props) => {
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
  }, [props.isAuthenticated, navigate]);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin} isAdmin={props.isAdmin} user={props.user}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelNuevaCita user={props.user}/>
      </div>
    </div>
  );
};

export default NuevaCita;
