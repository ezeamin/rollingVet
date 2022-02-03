import React from "react";
import "./plan.css";

const Plan = (props) => {
  const [precio, setPrecio] = React.useState(0);
  const [precioTotal, setPrecioTotal] = React.useState(0);
  const [checked, setChecked] = React.useState(props.plan.checked);

  React.useEffect(() => {
    const fetchInfo = async () => {
      const response = await fetch("/api/precios", {
        method: "GET",
      });
      const data = await response.json();

      setPrecio(data.precios[props.index - 1].precio);
      setPrecioTotal(data.precios[props.index - 1].precioTotal);
    };
    if (props.index !== 0) fetchInfo();
  }, [props.index]);

  React.useEffect(() => {
      if(props.plan.checked) setChecked(true);
      else setChecked(false);
    }, [props.plan.checked]);

  const handleChange = (e) => {
    setChecked(!checked);
    props.setSeleccionado(props.plan.titulo);
  };

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
            checked={checked}
          />
        </div>
      </div>
    </div>
  );
};

export default Plan;
