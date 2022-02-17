import React from "react";
import "./list.css";
import ListItem from "./listItem/ListItem";
import convertir from "../../../../js/convertirFecha";

const comparar = (a, b) => {
  let fechaA = a.fecha.split("-");
  let fechaB = b.fecha.split("-");

  let fechaADate = new Date(fechaA[2], fechaA[1] - 1, fechaA[0]);
  let fechaBDate = new Date(fechaB[2], fechaB[1] - 1, fechaB[0]);

  if (fechaADate.getTime() > fechaBDate.getTime()) {
    return 1;
  } else if (fechaADate.getTime() < fechaBDate.getTime()) {
    return -1;
  } else {
    if (a.hora.split(":")[0] > b.hora.split(":")[0]) {
      return 1;
    } else return -1;
  }
};

const compararPacientes = (a, b) => {
  let fechaA = a.incorporacion.split("-");
  let fechaB = b.incorporacion.split("-");

  let fechaADate = new Date(fechaA[2], fechaA[1] - 1, fechaA[0]);
  let fechaBDate = new Date(fechaB[2], fechaB[1] - 1, fechaB[0]);

  if (fechaADate.getTime() >= fechaBDate.getTime()) {
    return 1;
  } else if (fechaADate.getTime() < fechaBDate.getTime()) {
    return -1;
  }
};

const List = (props) => {
  const [datos, setDatos] = React.useState([]);
  const [content, setContent] = React.useState("loading");
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPacientes = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+"/api/pacientes", {
          method: "GET",
          signal: abortCont.signal,
          credentials: "include",
        });
        let data = await response.json();

        if (data.pacientes.length === 0) {
          setDatos([]);
          setCargando(false);
          setContent("null");
          return;
        }

        let datos = [];

        data.pacientes.sort((a, b) => compararPacientes(a, b));
        data.pacientes.reverse();
        data.pacientes = data.pacientes.slice(0, 3);

        data.pacientes.forEach((paciente) => {
          const nombre = `${paciente.nombre} ${paciente.apellido}`;
          datos.push({
            avatar: paciente.avatar,
            nombre: nombre,
            mascotas: paciente.mascotas.length,
            plan: paciente.plan,
          });
        });
        setDatos(datos);
        setCargando(false);
        setContent("pacientes");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    const fetchCitas = async (modo) => {
      try {
        let data;
        if (modo === "todas") {
          const response = await fetch(process.env.REACT_APP_SERVER_URL+"/api/citasProgramadas", {
            method: "GET",
            signal: abortCont.signal,
            credentials: "include",
          });
          data = await response.json();
        } else {
          const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/citasProgramadas/${props.dni}`, {
            method: "GET",
            signal: abortCont.signal,
            credentials: "include",
          });
          data = await response.json();
        }

        if (data.citas.length === 0) {
          setDatos([""]);
          setCargando(false);
          setContent("null");
          return;
        }

        let datos = [];

        data.citas.sort((a, b) => comparar(a, b));
        data.citas = data.citas.slice(0, 3);

        data.citas.forEach((cita) => {
          const nombre = `${cita.paciente.nombre}`;
          datos.push({
            avatar: cita.paciente.avatar,
            nombre: nombre,
            mascota: cita.mascota,
            fecha: convertir(cita.fecha),
            hora: cita.hora,
          });
        });
        setDatos(datos);
        setCargando(false);
        if (modo === "todas") setContent("citas");
        else setContent("citasPropias");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    switch (props.content) {
      case "pacientes":
        fetchPacientes();
        break;
      case "citas":
        fetchCitas("todas");
        break;
      case "citasPropias":
        fetchCitas("propias");
        break;
      default:
        break;
    }

    return () => {
      abortCont.abort();
    };
  }, [props.content, props.dni]);

  if (cargando)
    if (props.content === "citasPropias") {
      return (
        <div className="col-lg-12 col-xl-6">
          <div className="admin__card admin__list">
            <div className="admin__list-titulo">
              <h3 className="mb-0 p-3">{props.titulo}</h3>
            </div>
            <ListItem key={0} {...datos} content={"loading"} />
          </div>
          <div className="text-center">
            <button className="btnForm px-3" onClick={props.handleClick}>
              Ver mas
            </button>
          </div>
        </div>
      );
    } else
      return (
        <div className="col-md-12 col-lg-6">
          <div className="admin__card admin__list">
            <div className="admin__list-titulo">
              <h3 className="mb-0 p-3">{props.titulo}</h3>
            </div>
            <ListItem key={0} {...datos} content={"loading"} />
          </div>
          <div className="text-center">
            <button className="btnForm px-3" onClick={props.handleClick}>
              Ver mas
            </button>
          </div>
        </div>
      );
  if (props.content === "citasPropias") {
    return (
      <div className="col-lg-12 col-xl-6">
        <div className="admin__card admin__list">
          <div className="admin__list-titulo">
            <h3 className="mb-0 p-3">{props.titulo}</h3>
          </div>
          {datos.map((datos, index) => {
            return <ListItem key={index} {...datos} content={content} />;
          })}
        </div>
        <div className="text-center">
          <button className="btnForm px-3" onClick={props.handleClick}>
            Ver mas
          </button>
        </div>
      </div>
    );
  } else
    return (
      <div className="col-md-12 col-lg-6">
        <div className="admin__card admin__list">
          <div className="admin__list-titulo">
            <h3 className="mb-0 p-3">{props.titulo}</h3>
          </div>
          {datos.map((datos, index) => {
            return <ListItem key={index} {...datos} content={content} />;
          })}
        </div>
        <div className="text-center">
          <button className="btnForm px-3" onClick={props.handleClick}>
            Ver mas
          </button>
        </div>
      </div>
    );
};

export default List;
