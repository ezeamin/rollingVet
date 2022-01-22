import React from "react";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../js/adminResize";
import PanelVeterinarios from "../../../components/admin/veterinarios/PanelVeterinarios";

const Veterinarios = () => {
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
            <PanelVeterinarios />
          </div>
        </div>
      );
};

export default Veterinarios;