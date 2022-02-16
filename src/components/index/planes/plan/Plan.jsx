import { Skeleton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./plan.css";

const Plan = (props) => {
  const [plan, setPlan] = React.useState({});

  React.useEffect(() => {
    const precioString = props.precio + ",00";
    const precioTotalString = props.precioTotal + ",00";
    switch (props.categoria) {
      case 1:
        setPlan({
          plan: "Primeros pasos",
          descripcion: "Mascotas de 0 a 5 años",
          precio: precioString,
          precioFinal: precioTotalString,
          image: "img/index/planes/primeros-pasos.jpg",
        });
        break;
      case 2:
        setPlan({
          plan: "Madurando",
          descripcion: "Mascotas de 5 a 10 años",
          precio: precioString,
          precioFinal: precioTotalString,
          image: "img/index/planes/madurando.jpg",
        });
        break;
      case 3:
        setPlan({
          plan: "Adultos",
          descripcion: "Mascotas de más de 10 años",
          precio: precioString,
          precioFinal: precioTotalString,
          image: "img/index/planes/adultos.jpg",
        });
        break;
      default: {
      }
    
  }
  }, [props.categoria, props.precio, props.precioTotal]);

  if(props.error){
    return (
      <div className="card">
        <div className="card__img">
          <img src={plan.image} alt={plan.plan} />
        </div>
        <div className="card__body">
          <div className="card__body-superior">
            <h3 className="card__body-title mb-0">{plan.plan}</h3>
            <p className="card__body-descripcion">{plan.descripcion}</p>
          </div>
          <div className="card__body-inferior">
            <div className="d-flex align-items-center justify-content-center">
              <p className="card__body-precio mb-0 me-2">$ </p>
              <Skeleton variant="text" width="30%" height="60px" />
            </div>
            <div className="d-flex align-items-center justify-content-center mb-4">
              <p className="card__body-precio-final mb-0 px-1"> *durante un mes, luego $ </p>
              <Skeleton variant="text" width="50px" height="30px" />
            </div>
            <div className="card__body-boton mb-4">
              <Link to="/planes">+ info</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="card__img">
        <img src={plan.image} alt={plan.plan} />
      </div>
      <div className="card__body">
        <div className="card__body-superior">
          <h3 className="card__body-title mb-0">{plan.plan}</h3>
          <p className="card__body-descripcion">{plan.descripcion}</p>
        </div>
        <div className="card__body-inferior">
          <p className="card__body-precio mb-0">${plan.precio}*</p>
          <p className="card__body-precio-final mb-4 px-1">
            *durante un mes, luego ${plan.precioFinal}
          </p>
          <div className="card__body-boton mb-4">
            <Link to="/planes">+ info</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
