import React from "react";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import "./crudPacientes.css";
import PanelEditarPaciente from "../../../../components/admin/pacientes/panelEditarPaciente/PanelEditarPaciente";
import { useNavigate } from "react-router-dom";

const CrudPacientes = (props) => {
  const navigate = useNavigate();
  
  const url = window.location.href;
  const urlSplit = url.split("/");
  const dni = urlSplit[urlSplit.length - 1];

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
          isAdmin={props.isAdmin}
        />
      </div>
      <div className="col-xl-10 admin__panel">
        <button className="btnVolver" onClick={()=>navigate(-1)}><i class="fas fa-chevron-left"></i></button>
        <NavegacionResponsive />
        <PanelEditarPaciente dni={dni} user={props.user}/>
      </div>
    </div>
  );
};

export default CrudPacientes;
