import React from "react";
import Plan from "./plan/Plan";

const DetallePlanes = () => {
  const [planes, setPlanes] = React.useState([]);

  React.useEffect(() => {
    const fetchPrecios = async () => {
      const response = await fetch("/api/precios",{
        method: "GET",
      });
      const data = await response.json();

      setPlanes([{
        num: 1,
        precio: data.precios[0].precio,
        precioTotal: data.precios[0].precioTotal,
      },
      {
        num: 2,
        precio: data.precios[1].precio,
        precioTotal: data.precios[1].precioTotal,
      },
      {
        num: 3,
        precio: data.precios[2].precio,
        precioTotal: data.precios[2].precioTotal,
      }]);
    }
    fetchPrecios();
  }, []);

  return (
    <article className="planes__container">
      {planes.map((plan) => (
        <Plan key={plan.num} index={plan.num} precio={plan.precio} precioTotal={plan.precioTotal}/>
      ))}
    </article>
  );
};

export default DetallePlanes;
