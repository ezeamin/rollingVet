import React from "react";
import ItemPrecios from "./itemPrecios/ItemPrecios";

const PanelPrecios = () => {
    const planes = ["Primeros pasos", "Madurando", "Adultos"];

  return (
    <div className="container py-5 admin__panel-content">
      <h1 className="mb-3 h3__bold">Precios de planes</h1>
      <div className="row">
        {planes.map((plan,index) => {
            return <ItemPrecios key={index} plan={plan} />
        })}
      </div>
    </div>
  );
};

export default PanelPrecios;
