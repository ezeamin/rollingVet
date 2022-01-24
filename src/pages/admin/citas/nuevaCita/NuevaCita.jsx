import React from 'react';
import PanelNuevaCita from "../../../../components/admin/citas/panelNuevaCita/PanelNuevaCita";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";

const NuevaCita = () => {
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
            <PanelNuevaCita />
          </div>
        </div>
      );
};

export default NuevaCita;