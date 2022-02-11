import React from "react";
import Card from "./card/Card";
import "./clientes.css";

const comentarios = [
  "Es lo mejor que me pasó en mi vida",
  "La atencion es excelente, en especial la del doctor Esteban",
  "Es una excelente atencion, la recomiendo",
  "Lleve a mi Schnauzer a lavado y lo dejaron impecable",
  "Muy bien ubicado, muy buena atencion",
  "Increible lo amoroso que es todo el personal. Volvería siempre",
  "¡Los precios son super accesibles y la atencion es de calidad!",
  "¡Me encantó la predisposicion del veterinario! ¡La recomiendo!",
  "Me lo recomendó una amiga y ya veo por qué insistió tanto. ¡Son increibles!",
  "Vivo a una cuadra y siempre lo vi pero nunca habia entrado. Es fantastico el lugar",
  "Me encantó que tenga un patio deportivo para mi cachorro. Se super divirtió",
  "Sin palabras realmente. Muy buena atencion y muy buenos precios",
  "¿Aceptan CVs? Porque quiero trabajar con este maravilloso equipo!",
];

const Clientes = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  let elegidos = [];

  let clientes;
  if (width > 768) clientes = [1, 2, 3, 4, 5];
  else clientes = [1, 2, 3];

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  const generateRandom = () => {
    let error = false;
    let random;
    do {
      random = Math.floor(Math.random() * comentarios.length);

      if(elegidos.includes(random)) error = true;
      else error = false;

      if (!error) {
        elegidos.push(random);
      }
    } while (error);

    return random;
  };

  return (
    <div className="mt-5">
      <div>
        <h3 className="h3__bold">Nuestros clientes</h3>
        <p className="p__descripcion">
          Estamos orgullosos del servicio que brindamos, y lo mismo opinan
          nuestros honorables clientes. ¡Algunos hasta nos dieron la pata!
        </p>
      </div>
      <div className="card-clientes">
        {clientes.map((cliente, index) => {
          let num = generateRandom();
          console.log(num, comentarios[num]);
          return (
            <Card cliente={cliente} key={index} comentario={comentarios[num]} />
          );
        })}
      </div>
    </div>
  );
};

export default Clientes;
