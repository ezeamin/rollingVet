import React from "react";
import Plan from "./plan/Plan";
import "./planes.css";

const planes = [1, 2, 3];

const Planes = () => {
  return (
    <div className="mt-5">
      <div>
        <h3 className="h3__bold">Nuestros planes</h3>
        <p className="p__descripcion">
          Porque siempre queremos lo mejor para tu amigo fiel, tenemos los
          precios mas accesibles del mercado. Todos los planes incluyen un baño
          semanal y hasta 5 consultas veterinarias mensuales sin cargo
          adicional. Nosotros nos ocupamos del resto
        </p>
      </div>
      <div className="card-planes">
        {planes.map((plan, index) => {
          return <Plan categoria={plan} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Planes;
