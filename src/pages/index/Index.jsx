import React from "react";
import { Clientes, Clima, Footer, Info, Main, Planes, Profesionales } from "../../components/index/index";
import Header from "../../components/header/Header";
import "./indexPage.css";
import scrollDetection from "../../js/scroll";

const Index = () => {
  
  React.useEffect(() => {
    scrollDetection();
    window.scrollTo(0, 0);
    }, []);

  return (
    <div>
      <a href="#" className="fab">
        <i className="fas fa-arrow-up"></i>
      </a>
      <a href="#footer" className="fab-contacto">
        <i className="far fa-comments"></i>
      </a>
      <div className="gradient__bg">
        <div className="container">
          <div className="landing">
            <Header />
            <Main />
          </div>
          <Info />
          <Planes />
          <Clima />
          <Clientes />
          <Profesionales />
          <Footer titulo="Contacto" color="primary"/>
        </div>
      </div>
    </div>
  );
};

export default Index;
