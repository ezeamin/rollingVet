import "./planes.css";
import React from "react";
import { Footer } from "../../components/index";
import Header from "../../components/index/header/Header";
import Main from "../../components/planes/main/Main";
import DetallePlanes from "../../components/planes/detallePlanes/DetallePlanes";
import scrollDetection from "../../js/scroll";

const Planes = () => {

  React.useEffect(() => {
    scrollDetection();
    window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <a href="#" className="fab" id="fab__arrow-a">
        <i className="fas fa-arrow-up" id="fab__arrow"></i>
      </a>
      <div className="gradient__bg-planes">
        <div className="container">
          <Header />
          <Main />
          <DetallePlanes />
          <Footer titulo="¿Aún tienes dudas?" />
        </div>
      </div>
    </div>
  );
};

export default Planes;
