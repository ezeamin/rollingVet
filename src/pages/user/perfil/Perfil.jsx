import React from "react";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import "./perfil.css";
import resize from "../../../js/adminResize";
import { useNavigate } from "react-router-dom";
import PanelPerfil from "../../../components/user/perfil/PanelPerfil";

const Perfil = (props) => {
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
    else if(props.isAdmin) {
      navigate("/admin");
    }
  }, [props.isAuthenticated, props.isAdmin, navigate]);

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
        <PanelPerfil user={props.user} />
      </div>
    </div>
  );
};

export default Perfil;
