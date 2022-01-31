import React from "react";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../js/adminResize";
import PanelPrecios from "../../../components/admin/precios/PanelPrecios";
import { useNavigate } from "react-router-dom";

const Precios = (props) => {
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
        <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin} isAdmin={props.isAdmin}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelPrecios />
      </div>
    </div>
  );
};

export default Precios;
