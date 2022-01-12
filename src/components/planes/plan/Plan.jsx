import React from "react";
import "./plan.css";

const Plan = (props) => {
  const [plan, setPlan] = React.useState({});

  React.useEffect(() => {
    switch (props.categoria) {
      case 1:
        setPlan({
          plan: "Primeros pasos",
          descripcion: "Mascotas de 0 a 5 años",
          precio: "$200,00",
          precioFinal: "$350,00",
          image: "img/index/planes/primeros-pasos.jpg",
        });
        break;
      case 2:
        setPlan({
          plan: "Madurando",
          descripcion: "Mascotas de 5 a 10 años",
          precio: "$400,00",
          precioFinal: "$700,00",
          image: "img/index/planes/madurando.jpg",
        });
        break;
      case 3:
        setPlan({
          plan: "Adultos",
          descripcion: "Mascotas de más de 10 años",
          precio: "$750,00",
          precioFinal: "$1000,00",
          image: "img/index/planes/adultos.jpg",
        });
        break;
      default: {
      }
    }
  }, []);

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
          <p className="card__body-precio mb-0">{plan.precio}</p>
          <p className="card__body-precio-final mb-4">
            durante un mes, luego {plan.precioFinal}
          </p>
          <div className="card__body-boton mb-4">
            <a href="...">+ info</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
