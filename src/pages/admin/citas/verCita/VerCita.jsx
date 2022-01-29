import React from "react";
import PanelVerCita from "../../../../components/admin/citas/panelVerCita/PanelVerCita";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import { useNavigate } from "react-router-dom";
import Carga from "../../../../components/admin/carga/Carga";

const VerCita = (props) => {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlSplit = url.split("/");
  let codigoCita = urlSplit[urlSplit.length - 1];
  if(codigoCita.includes("VOD")) codigoCita = codigoCita.split("-")[0];

  React.useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);
  
  React.useEffect(() => {
    if (!props.isAdmin) {
      navigate("/");
    }
  }, [props.isAdmin]);

  const navigateSuccess = () => {
    navigate("/admin/citas");
  }
  
  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <PanelVerCita codigoCita={codigoCita} navigateSuccess={navigateSuccess}/>
      </div>
    </div>
  );
};

export default VerCita;
