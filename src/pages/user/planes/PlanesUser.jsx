import React from "react";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import PanelPlanes from "../../../components/user/planes/PanelPlanes";
import "./planes.css";
import resize from "../../../js/adminResize";

const PlanesUser = (props) => {

  const testAuth = props.testAuth;

  React.useEffect(() => {
    props.testAuth(true);
    
    window.addEventListener("resize", resize);
  }, []);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion
          setIsAuthenticated={props.setIsAuthenticated}
          setIsAdmin={props.setIsAdmin}
          user={props.user}
          isAdmin={false}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelPlanes user={props.user || {}} />
      </div>
    </div>
  );
};

export default PlanesUser;
