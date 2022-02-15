import React from "react";
import ItemPrecios from "./itemPrecios/ItemPrecios";
import Carga from "../carga/Carga";
import Error from "../error/Error";

const PanelPrecios = () => {
  const [planes, setPlanes] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPrecios = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+"/api/precios", {
          method: "GET",
          signal: abortCont.signal,
          credentials: "include",
        });

        if (!response.ok) {
          setError(true);
          setCargando(false);
          return;
        }

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

  if (cargando) return <Carga />;
  else if (error) return <Error />;
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
