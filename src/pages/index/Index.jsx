import React from "react";
import {
  Clientes,
  Clima,
  Info,
  Main,
  Planes,
  Profesionales,
} from "../../components/index/index";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./indexPage.css";
import scrollDetection from "../../js/scroll";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
  const navigate = useNavigate();
  
  const testAuth = props.testAuth;

  React.useEffect(() => {
    scrollDetection();
    window.scrollTo(0, 0);

    testAuth();
  }, [testAuth]);

  React.useEffect(() => {
    if(props.isAuthenticated) {
      if (props.isAdmin) {
        navigate("/admin");
      }
      else {
        navigate("/user");
      }
    }
  }, [props.isAdmin, props.isAuthenticated, navigate]);

  return (
    <div>
      <a href="#landing" className="fab">
        <i className="fas fa-arrow-up"></i>
      </a>
      <a href="#footer" className="fab-contacto">
        <i className="far fa-comments"></i>
      </a>
      <div className="gradient__bg">
        <div className="container">
          <div className="landing">
            <Header
              isAuthenticated={props.isAuthenticated}
              setIsAuthenticated={props.setIsAuthenticated}
            />
            <Main />
          </div>
          <Info />
          <Planes />
          <Clima />
          <Clientes />
          <Profesionales />
          <Footer titulo="Contacto" color="primary" />
        </div>
      </div>
    </div>
  );
};

export default Index;
