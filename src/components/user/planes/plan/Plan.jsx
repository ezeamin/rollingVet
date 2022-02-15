import React from "react";
import "./plan.css";
import { Skeleton } from "@mui/material";

const Plan = (props) => {
  const [precio, setPrecio] = React.useState(0);
  const [precioTotal, setPrecioTotal] = React.useState(0);
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchInfo = async () => {
      try {
        const response = await fetch("/api/precios", {
          method: "GET",
          signal: abortCont.signal,
        });
        const data = await response.json();

        setPrecio(data.precios[props.index - 1].precio);
        setPrecioTotal(data.precios[props.index - 1].precioTotal);
        setCargando(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err+"Hola");
        }
      }
    };
    if (props.index !== 0) fetchInfo();
    else setTimeout(()=>setCargando(false),300);

    return () => {
      abortCont.abort();
    };
  }, [props.index]);

  const handleChange = (e) => {
    props.setSeleccionado(props.plan.titulo);
  };

  if (cargando) {
    return (
      <div className="user__planes-container my-2">
        <div className="user__planes-info user__planes-info-cargando">
          <Skeleton variant="text" width={"75%"} className="mb-2"/>
          <Skeleton variant="text" width={"250px"} className="mb-2" />
          <p>
          <Skeleton variant="text" width={"200px"} />
          </p>
        </div>
        <div className="user__planes-select">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="user__planes-container my-2">
      <div className="user__planes-info">
        <h3>{props.plan.titulo}</h3>
        <p className="p__descripciones">{props.plan.descripcion}</p>
        <p>
          Precio: ${precio}, luego ${precioTotal}
        </p>
      </div>
      <div className="user__planes-select">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="planes"
            value={props.plan.titulo}
            onChange={handleChange}
            checked={props.checked}
          />
        </div>
      </div>
    </div>
  );
};

export default Plan;
