import React from "react";
import "./card.css";

const Card = () => {
  const modelo = {
    iconUrl: "",
    tiempo: "",
    description: "",
  };
  const [clima, setClima] = React.useState(modelo);

  React.useEffect(() => {
    const fetchClima = async () => {
      const appId = "ac30c37d1ff270376eef9ad6c4c01a99";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Tucuman,Argentina&appid=${appId}&lang=es&units=metric`;
      const respuesta = await fetch(url);
      const datos = await respuesta.json();

      const description =
        datos.weather[0].description[0].toUpperCase() +
        datos.weather[0].description.substring(1);

      const iconUrl =
        "http://openweathermap.org/img/wn/" + datos.weather[0].icon + "@2x.png";

      setClima({
        tiempo: Math.round(datos.main.temp),
        description: description,
        iconUrl: iconUrl,
      });
    };

    fetchClima();
  }, []);

  return (
    <div className="clima__card">
      <div className="clima__card-content">
        <div className="clima__card__icono">
          <img src={clima.iconUrl} alt="icono del clima" className="w-100" />
        </div>
        <div className="clima__card__texto">
          <h4 className="clima__card__texto-temp">{clima.tiempo}°</h4>
          <p className="clima__card__texto-desc p__clima">
            {clima.description}
          </p>
          <p className="clima__card__texto-minmax p__clima">
            San Miguel de Tucumán
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
