import React from "react";
import Card from "./card/Card";
import "./profesionales.css";

const Profesionales = () => {
    const cards = [1,2,3,4]

  return (
    <div className="mt-5 pro__container">
      <div className="pro__titulos">
        <h3 className="pro__titulos-titulo h3__bold">Nuestros profesionales</h3>
        <p className="pro__titulos-subtitulo p__description">
          Si nuestros clientes eran de lo mejor, ni hablar de nuestro staff.
          Tenemos todo el conocimiento necesario (más algun cursito) para poder
          atender, cuidar, y amar a tu mascota tanto como vos
        </p>
      </div>
      <div className="pro__profesionales-max"></div>
      <div className="pro__profesionales">
          {cards.map((card,index) => {
              return(
                  <Card key={index} profesional={index}/>
              )
          })}
      </div>
      <div className="pro__sobreNosotros">
        <p className="pro__sobreNosotros-titulo p__description">
          Somos un equipo nacido en 2019 con la intencion de traer seguridad en
          el cuidado animal de cada hogar. Hoy, cumplimos con nuestro objetivo y
          garantizamos tu tranquilidad
          <br />
          <br />
          ¡Tu mascota queda siempre en las mejores manos!
        </p>
      </div>
    </div>
  );
};

export default Profesionales;
