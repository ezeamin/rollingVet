import React from "react";
import Plan from "./plan/Plan";

const DetallePlanes = () => {
  const [planes, setPlanes] = React.useState([]);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPrecios = async () => {
      try {
        const response = await fetch(process.env.SERVER_URL+"/api/precios", {
          method: "GET",
          signal: abortCont.signal,
        });
        const data = await response.json();

        setPlanes([
          {
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
          },
        ]);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    fetchPrecios();

    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <article className="planes__container">
      {planes.map((plan) => (
        <Plan
          key={plan.num}
          index={plan.num}
          precio={plan.precio}
          precioTotal={plan.precioTotal}
        />
      ))}
    </article>
  );
};

export default DetallePlanes;
