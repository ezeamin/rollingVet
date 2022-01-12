import React from "react";
import "./card.css";

const Card = () => {
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://randomuser.me/api/")
            const user = await res.json();

            const finalUser = {
                name: user.results[0].name.first,
                image: user.results[0].picture.large,
                age: user.results[0].dob.age,
                comentario: "Lorem ipsum dolor sit amet.",
            }

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
