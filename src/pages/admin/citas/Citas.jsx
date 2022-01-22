import React from "react";
import PanelCitas from "../../../components/admin/citas/PanelCitas";
import Navegacion from "../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import Panel from "../../../components/admin/panel/Panel";
import resize from "../../../js/adminResize";
import './citas.css';

const Citas = () => {
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
            <PanelCitas />
          </div>
        </div>
      );
};

export default Citas;