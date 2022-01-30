import "./planes.css";
import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Main from "../../components/planes/main/Main";
import DetallePlanes from "../../components/planes/detallePlanes/DetallePlanes";
import scrollDetection from "../../js/scroll";
import { useNavigate } from "react-router-dom";

const Planes = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    scrollDetection();
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (props.isAdmin) {
      navigate("/admin");
    }
  }, [props.isAdmin]);

  return (
    <div>
      <a href="#" className="fab" id="fab__arrow-a">
        <i className="fas fa-arrow-up" id="fab__arrow"></i>
      </a>
      <div className="gradient__bg-planes">
        <div className="container">
          <Header
            isAuthenticated={props.isAuthenticated}
            setIsAuthenticated={props.setIsAuthenticated}
          />
          <Main />
          <DetallePlanes />
          <Footer titulo="¿Aún tienes dudas?" color="secondary" />
        </div>
      </div>
    </div>
  );
};

export default Planes;
