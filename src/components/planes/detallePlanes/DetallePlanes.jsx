import React from "react";
import Plan from "./plan/Plan";

const DetallePlanes = () => {
  const [planes, setPlanes] = React.useState([
    {
      num: 1,
      error: true,
    },
    {
      num: 2,
      error: true,
    },
    {
      num: 3,
      error: true,
    },
  ]);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPrecios = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/precios",
          {
            method: "GET",
            signal: abortCont.signal,
          }
        );
        const data = await response.json();

        if(data.ok){
          setPlanes([
            {
              num: 1,
              precio: data.precios[0].precio,
              precioTotal: data.precios[0].precioTotal,
              error: false,
            },
            {
              num: 2,
              precio: data.precios[1].precio,
              precioTotal: data.precios[1].precioTotal,
              error: false,
            },
            {
              num: 3,
              precio: data.precios[2].precio,
              precioTotal: data.precios[2].precioTotal,
              error: false,
            },
          ]);
        }
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
          error={plan.error}
        />
      ))}
    </article>
  );
};

export default DetallePlanes;
