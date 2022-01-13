import React from "react";
import "./rombo.css";

const Rombo = () => {
  return (
    <div className="rombo">
      <div className="rombo__item">
        <img src="img/index/profesionales/ezequiel.png" alt="Ezequiel Amin" />
        <div className="rombo__item-triangle"></div>
        <div className="rombo__item-nombre">Ezequiel Amin</div>
      </div>
      <div className="rombo__item">
        <img src="img/index/profesionales/elsa.jpg" alt="Elsa Capunta" />
        <div className="rombo__item-triangle"></div>
        <div className="rombo__item-nombre">Elsa Capunta</div>
      </div>
      <div className="rombo__item">
        <img src="img/index/profesionales/esteban.jpg" alt="Estaban Dido" />
        <div className="rombo__item-triangle"></div>
        <div className="rombo__item-nombre">Estaban Dido</div>
      </div>
      <div className="rombo__item">
        <img src="img/index/profesionales/armando.jpg" alt="Armando Paredes" />
        <div className="rombo__item-triangle"></div>
        <div className="rombo__item-nombre">Armando Paredes</div>
      </div>
    </div>
  );
};

export default Rombo;
