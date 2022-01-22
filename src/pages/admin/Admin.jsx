import React from "react";
import Navegacion from "../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import Panel from "../../components/admin/panel/Panel";
import "./admin.css";

const Admin = () => {
  const resize = () => {
    if (window.innerWidth > 1200) {
      document.getElementsByClassName("admin__nav")[0].style.display = "block";
      document.getElementsByClassName(
        "admin__nav-container"
      )[0].style.transform = "translateX(0%)";
      document.getElementsByClassName("admin__nav-bg")[0].style.opacity = "1";
    } else {
      document.getElementsByClassName("admin__nav")[0].style.display = "none";
      document.getElementsByClassName(
        "admin__nav-container"
      )[0].style.transform = "translateX(-100%)";
      document.getElementsByClassName("admin__nav-bg")[0].style.opacity = "0";
    }
  };

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
        <Panel />
      </div>
    </div>
  );
};

export default Admin;
