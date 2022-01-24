import React from "react";
import PanelVerCita from "../../../../components/admin/citas/panelVerCita/PanelVerCita";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";

const VerCita = () => {
    React.useEffect(() => {
        window.addEventListener("resize", resize);
      }, []);
    
      return (
        <div className="row admin">
          <div className="col-xl-2 admin__nav">
            <Navegacion />
          </div>
          <div className="col-xl-10 admin__panel">
            <NavegacionResponsive />
            <PanelVerCita />
          </div>
        </div>
      );
};

export default VerCita;