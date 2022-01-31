import React from "react";
import ItemPrecios from "./itemPrecios/ItemPrecios";
import Carga from "../carga/Carga"

const PanelPrecios = () => {
  const [planes,setPlanes] = React.useState([]);
  const [cargando,setCargando] = React.useState(true);

  React.useEffect(() => {
    const precios = async () => {
      const response = await fetch("/api/precios");
      const data = await response.json();

      setPlanes([
      {
        plan: "Primeros pasos",
        precio: data.precios[0].precio,
      },
      {
        plan: "Madurando",
        precio: data.precios[1].precio,
      },
      {
        plan: "Adultos",
        precio: data.precios[2].precio,
      },
      ]);

      setCargando(false);
    };
    precios();
  }, []);

  if(cargando) return <Carga />;
  return (
    <div className="container py-5 admin__panel-content">
      <h1 className="mb-3 h3__bold">Precios de planes</h1>
      <div className="row">
        {planes.map((plan, index) => {
          return <ItemPrecios key={index} datos={plan} />;
        })}
      </div>
    </div>
  );
};

export default PanelPrecios;
