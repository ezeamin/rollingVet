import React from "react";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import PanelPlanes from "../../../components/user/planes/PanelPlanes";
import "./planes.css";
import resize from "../../../js/adminResize";
import { useNavigate } from "react-router-dom";

const PlanesUser = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    props.testAuth(true);
    
    window.addEventListener("resize", resize);
  }, []);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion
          setIsAdmin={props.setIsAdmin}
          user={props.user}
          isAdmin={false}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <button className="btnVolver" onClick={()=>navigate(-1)}><i className="fas fa-chevron-left"></i></button>
        <NavegacionResponsive />
        <PanelPlanes user={props.user || {}} />
      </div>
    </div>
  );
};

export default PlanesUser;
