import React from "react";
import "./plan.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Skeleton } from "@mui/material";

const Plan = (props) => {
  const [plan, setPlan] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const precioString = props.precio + ",00";
    const precioTotalString = props.precioTotal + ",00";
    switch (props.index) {
      case 1:
        setPlan({
          titulo: "Primeros pasos",
          descripcion: "Mascotas de 0 a 5 años",
          precio: precioString,
          precioFinal: precioTotalString,
        });
        break;
      case 2:
        setPlan({
          titulo: "Madurando",
          descripcion: "Mascotas de 5 a 10 años",
          precio: precioString,
          precioFinal: precioTotalString,
        });
        break;
      case 3:
        setPlan({
          titulo: "Adultos",
          descripcion: "Mascotas de más de 10 años",
          precio: precioString,
          precioFinal: precioTotalString,
        });
        break;
      default: {
      }
    }
  }, [props.index, props.precio, props.precioTotal]);

  const handleClick = () => {
    Swal.fire({
      title: "Para eso, debes iniciar sesion",
      text: " ",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/login?redirect=user/perfil/planes");
    });
  };

  if(props.error){
    return (
      <section className="plan__seccion">
        <div className="plan__descripcion">
          <div className="plan__titulo">
            <h3 className="h3__bold mb-0">{plan.titulo}</h3>
            <p className="p__descripciones">{plan.descripcion}</p>
          </div>
          <div>
            <div className="d-flex align-items-center preciosSkeleton">
              <h4 className="plan__precio me-2 mb-0">$ </h4>
              <Skeleton variant="text" width="30%" height="60px" />
            </div>
            <div className="d-flex align-items-center preciosSkeleton">
              <p className="p__descripciones p__precioFinal me-2 mb-0">*durante un mes, luego $ </p>
              <Skeleton variant="text" width="50px" height="30px" />
            </div>
          </div>
        </div>
        <div className="plan__boton">
          <button className="p__descripciones" onClick={handleClick}>
            Quiero este plan
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="plan__seccion">
      <div className="plan__descripcion">
        <div className="plan__titulo">
          <h3 className="h3__bold mb-0">{plan.titulo}</h3>
          <p className="p__descripciones">{plan.descripcion}</p>
        </div>
        <div>
          <h4 className="plan__precio">${plan.precio}*</h4>
          <p className="p__descripciones p__precioFinal">
            *durante el primer mes, luego ${plan.precioFinal}
          </p>
        </div>
      </div>
      <div className="plan__boton">
        <button className="p__descripciones" onClick={handleClick}>
          Quiero este plan
        </button>
      </div>
    </section>
  );
};

export default Plan;
