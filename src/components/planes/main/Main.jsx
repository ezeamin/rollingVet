import React from "react";
import "./main.css";

const Main = () => {
  return (
    <article className="main">
      <h1 className="main-planes__title">Nuestros planes</h1>
      <p className="p__descripciones">
        Pensamos en vos y tu mascota, y sabemos que se merecen lo mejor. A raiz
        de eso, nacieron nuestros planes al estilo de obra social. Todos los
        planes mensuales cuentan con los siguientes increibles servicios:
      </p>
      <div className="main-planes__listaYFoto">
        <ul className="main-planes__ul">
            <li className="p__descripciones">5 consultas veterinarias</li>
            <li className="p__descripciones">2 baños con recorte de uñas</li>
            <li className="p__descripciones">
            10% de descuento en medicamentos y alimento
            </li>
            <li className="p__descripciones">20% de descuento en accesorios</li>
        </ul>
        <div className="main-planes__divImg">
            <img src="/img/planes/perro-banandose.jpg" alt="perro bañandose" />
        </div>
      </div>
    </article>
  );
};

export default Main;
