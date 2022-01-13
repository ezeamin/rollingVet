import React from "react";
import "./card.css";

const Card = () => {
    const [user, setUser] = React.useState({});

    const comentarios = [
        "Es lo mejor que me pasó en mi vida",
        "La atencion es excelente, en especial la del doctor Eze",
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
        "¿Aceptan CVs? Porque quiero trabajar con este maravilloso equipo!"
    ];

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://randomuser.me/api/")
            const user = await res.json();

            const finalUser = {
                name: user.results[0].name.first,
                image: user.results[0].picture.large,
                age: user.results[0].dob.age,
                comentario: comentarios[Math.floor(Math.random()*comentarios.length)],
            }

            // console.log(Math.floor(Math.random()*comentarios.length));

            setUser(finalUser);
        }

        fetchData();
    }, []);

  return (
    <div className="cardClientes">
      <div className="cardClientes__img">
        <img src={user.image} alt={user.name} />
      </div>
      <div className="cardClientes__body">
        <h3 className="cardClientes__body-title mb-0">{user.name}</h3>
        <p className="cardClientes__body-descripcion">{user.comentario}</p>
      </div>
    </div>
  );
};

export default Card;
