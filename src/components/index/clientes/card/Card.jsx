import React from "react";
import "./card.css";

const Card = (props) => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://randomuser.me/api/?nat=ES&inc=name,picture",
          {
            signal: abortCont.signal,
          }
        );
        const user = await res.json();

        const finalUser = {
          name: user.results[0].name.first,
          image: user.results[0].picture.large,
          comentario: props.comentario,
        };

        setUser(finalUser);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    fetchData();

    return () => {
      abortCont.abort();
    };
  }, [props.comentario]);

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
