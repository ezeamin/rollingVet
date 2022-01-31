import React from "react";
import Navegacion from "../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import Panel from "../../components/admin/panel/Panel";
import "./admin.css";
import resize from "../../js/adminResize";
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
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
          isAdmin={true}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <Panel />
      </div>
    </div>
  );
};

export default Admin;
