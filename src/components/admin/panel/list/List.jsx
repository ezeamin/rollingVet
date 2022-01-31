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
  }
};

const List = (props) => {
  const [datos, setDatos] = React.useState([]);
  const [content, setContent] = React.useState("loading");
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const fetchPacientes = async () => {
      const response = await fetch("api/pacientes", {
        method: "GET",
      });
      let data = await response.json();

      if (data.pacientes.length === 0) {
        setDatos([]);
        setCargando(false);
        setContent("null");
        return;
      }

      let datos = [];

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
    };

    const fetchCitas = async (modo) => {
      let data;
      if (modo === "todas") {
        const response = await fetch("api/citasProgramadas", {
          method: "GET",
        });
        data = await response.json();
      } else {
        const response = await fetch(`api/citasProgramadas/${props.dni}`, {
          method: "GET",
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
      default:
        break;
    }
  }, [props.content]);

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
          <button className="btnForm px-3" onClick={props.handleClick}>
            Ver mas
          </button>
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
          <button className="btnForm px-3" onClick={props.handleClick}>
            Ver mas
          </button>
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
        <button className="btnForm px-3" onClick={props.handleClick}>
          Ver mas
        </button>
      </div>
    );
};

export default List;
