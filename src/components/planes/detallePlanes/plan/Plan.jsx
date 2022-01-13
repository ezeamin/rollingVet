import React from "react";
import "./plan.css";

const planes = [
  {
    titulo: "Primeros pasos",
    descripcion: "Para mascotas de entre 0 y 5 años",
    precio: "$ 200,00",
    precioFinal: "$350,00"
  },
  {
    titulo: "Madurando",
    descripcion: "Para mascotas de entre 5 y 10 años",
    precio: "$ 450,00",
    precioFinal: "$700,00"
  },
  {
    titulo: "Adultos",
    descripcion: "Para mascotas de más de 10 años",
    precio: "$ 700,00",
    precioFinal: "$1,000,00"
  }
];

const Plan = (props) => {

  let plan;
  if(props.index===1) plan=planes[0];
  else if(props.index===2) plan=planes[1];
  else plan=planes[2];

  return (
    <section className="plan__seccion">
      <div className="plan__descripcion">
        <div className="plan__titulo">
          <h3 className="h3__bold mb-0">{plan.titulo}</h3>
          <p className="p__descripciones">{plan.descripcion}</p>
        </div>
        <div>
          <h4 className="plan__precio">{plan.precio}*</h4>
          <p className="p__descripciones p__precioFinal">
            *durante el primer mes, luego {plan.precioFinal}
          </p>
        </div>
      </div>
      <div className="plan__boton">
        <button className="p__descripciones">Quiero este plan</button>
      </div>
    </section>
  );
};

export default Plan;
