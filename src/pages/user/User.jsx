import React from "react";
import Navegacion from "../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import PanelUser from "../../components/user/panel/PanelUser";
import "./user.css";
import resize from "../../js/adminResize";

const User = (props) => {

  const testAuth = props.testAuth;

  React.useEffect(() => {
    testAuth(true);
    
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
        <PanelUser user={props.user} />
      </div>
    </div>
  );
};

export default User;
