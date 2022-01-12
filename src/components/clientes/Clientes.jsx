import React from "react";
import Card from "./card/Card";
import "./clientes.css";

const Clientes = () => {
    const[width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, []);

    let clientes;
    if(width > 768) clientes=[1,2,3,4,5];
    else clientes=[1,2,3];

  return (
    <div className="mt-5">
      <div>
        <h3 className="h3__bold">Nuestros clientes</h3>
        <p className="p__descripcion">
        Estamos orgullosos del servicio que brindamos, y lo mismo opinan nuestros honorables clientes. ¡Algunos hasta nos dieron la pata! <i className="fas fa-bone"></i>
        </p>
      </div>
      <div className="card-clientes">
        {clientes.map((cliente, index) => {
          return <Card cliente={cliente} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Clientes;
