import React from "react";
import Navegacion from "../../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../../js/adminResize";
import PanelEditarMascota from "../../../../../components/admin/pacientes/panelEditarMascota/PanelEditarMascota";

const EditarMascota = () => {
  const url = window.location.href;
  const urlSplit = url.split("/");
  const codigo = urlSplit[urlSplit.length - 2];

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
        <PanelEditarMascota codigo={codigo} />
      </div>
    </div>
  );
};

export default EditarMascota;
