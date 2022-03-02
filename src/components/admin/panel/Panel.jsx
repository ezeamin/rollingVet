import React from "react";
import CardAdmin from "./card/CardAdmin";
import List from "./list/List";
import "./panel.css";
import Carga from "../carga/Carga";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";

const Panel = (props) => {
  const [pacientes, setPacientes] = React.useState(0);
  const [citas, setCitas] = React.useState(0);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const info = [
    {
      titulo: "Pacientes",
      cantidad: pacientes,
    },
    {
      titulo: "Veterinarios",
      cantidad: "2",
    },
    {
      titulo: "Citas programadas",
      cantidad: citas,
    },
  ];

  React.useEffect(() => {
    const abortCont = new AbortController();

    const traerInfo = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/qty",
          {
            method: "GET",
            signal: abortCont.signal,
            credentials: "include",
          }
        );
        const info = await response.json();

        setPacientes(info.pacientes);
        setCitas(info.citas);
        setCargando(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    if (props.user.dni === 0) {
      setCargando(false);
      setError(true);
    } else traerInfo();

    return () => {
      abortCont.abort();
    };
  }, [props.user.dni]);

  const btnPacientesClick = () => {
    navigate("/admin/pacientes");
  };

  const btnCitasClick = () => {
    navigate("/admin/citas");
  };

  if (cargando) return <Carga />;
  if (error) return <Error />;
  return (
    <div className="container admin__panel-content">
      <h1 className="mb-3 h3__bold">Panel de administracion</h1>
      <div className="row justify-content-center">
        {info.map((info, index) => (
          <CardAdmin key={index} {...info} isAdmin={true} />
        ))}
      </div>
      <div className="row justify-content-center">
        <List
          titulo="Lista de pacientes"
          content="pacientes"
          handleClick={btnPacientesClick}
        />
        <List
          titulo="Lista de citas"
          content="citas"
          handleClick={btnCitasClick}
        />
      </div>
    </div>
  );
};

export default Panel;
