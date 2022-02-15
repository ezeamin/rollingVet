import React from "react";
import Plan from "./plan/Plan";
import "./planes.css";

const Planes = () => {
  const [planes, setPlanes] = React.useState([]);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPrecios = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+"/api/precios", {
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
    <div className="mt-5">
      <div>
        <h3 className="h3__bold">Nuestros planes</h3>
        <p className="p__descripcion">
          Porque siempre queremos lo mejor para tu amigo fiel, tenemos los
          precios mas accesibles del mercado. Todos los planes incluyen 2 baños
          mensuales y hasta 5 consultas veterinarias mensuales sin cargo
          adicional. Nosotros nos ocupamos del resto
        </p>
      </div>
      <div className="card-planes">
        {planes.map((plan, index) => {
          return (
            <Plan
              categoria={plan.num}
              key={index}
              precio={plan.precio}
              precioTotal={plan.precioTotal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Planes;
