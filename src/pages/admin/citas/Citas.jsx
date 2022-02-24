import React from "react";
import PanelCitas from "../../../components/admin/citas/PanelCitas";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../js/adminResize";
import { useNavigate } from "react-router-dom";

const Citas = (props) => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    props.testAuth(true);
    
    window.addEventListener("resize", resize);
  }, []);

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion setIsAdmin={props.setIsAdmin} isAdmin={props.isAdmin} user={props.user}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <button className="btnVolver" onClick={()=>navigate(-1)}><i className="fas fa-chevron-left"></i></button>
        <NavegacionResponsive />
        <PanelCitas user={props.user}/>
      </div>
    </div>
  );
};

export default Citas;
