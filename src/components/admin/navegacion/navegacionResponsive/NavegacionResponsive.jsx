import React from "react";
import { Link } from "react-router-dom";
import "./navegacionResponsive.css";

const NavegacionResponsive = () => {
  React.useEffect(() => {
    document
      .getElementsByClassName("admin__nav-toggler")[0]
      .addEventListener("click", () => {
        document.getElementsByClassName("admin__nav")[0].style.display =
          "block";
        setTimeout(() => {
          document.getElementsByClassName(
            "admin__nav-container"
          )[0].style.transform = "translateX(0%)";
          document.getElementsByClassName("admin__nav-bg")[0].style.opacity =
            "1";
        }, 100);
      });
  }, []);

  return (
    <div className="admin__nav-navbar-res">
      <div className="admin__nav-navbar-responsive container py-3">
        <div className="admin__nav-toggler" type="button">
          <i className="fas fa-bars fa-2x"></i>
        </div>
        <div className="admin__logo-responsive">
          <div to="/">
            <img src="/img/favicon.png" alt="logo RollingVet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavegacionResponsive;
