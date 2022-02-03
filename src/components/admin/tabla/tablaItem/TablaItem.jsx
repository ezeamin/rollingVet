import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./tablaItem.css";
import convertir from "../../../../js/convertirFecha";

const TablaItem = (props) => {
  const navigate = useNavigate();

  const getEdad = (fecha) => {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(fecha);

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
    let dia = fechaActual.getDate() - fechaNacimiento.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }

    return edad;
  };

  const editarPaciente = () => {
    navigate(`/admin/pacientes/${props.info.dni}`);
  };
  const eliminarPaciente = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonColor: "#6c757d",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) props.eliminar(props.info.dni);
    });
  };

  const atenderCita = () => {
    navigate(`/admin/citas/${props.info.codigoCita}`);
  };
  const cancelarCita = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Cancelar cita",
      cancelButtonColor: "#6c757d",
      cancelButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) props.eliminar(props.info.codigoCita);
    });
  };

  const revisarCita = () => {
    navigate(`/admin/citas/${props.info.codigoCita}-VOD`); //view only data
  };

  const editarMascota = () => {
    const codigo =
      window.location.href.split("/")[
        window.location.href.split("/").length - 2
      ];
    navigate(`/admin/pacientes/${codigo}/mascotas/${props.info.codigoMascota}`);
  };
  const eliminarMascota = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonColor: "#6c757d",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) props.eliminar(props.info.codigoMascota);
    });
  };

  const citas = (botones) => {
    return (
      <tr>
        <td className="admin__tables-avatar">
          <img src={props.info.paciente.avatar} alt={props.info.paciente.apellido} />
        </td>
        <td>
          {props.info.paciente.apellido}, {props.info.paciente.nombre}
        </td>
        <td>{props.info.mascota}</td>
        <td>{props.info.veterinario}</td>
        <td>{convertir(props.info.fecha)}</td>
        <td>{props.info.hora}</td>
        <td className="admin__tables-btn">
          {botones.map((boton) => {
            return boton;
          })}
        </td>
      </tr>
    );
  };

  let botones = [];
  switch (props.type) {
    case "veterinarios":
      botones = [
        <button
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-warning"
        >
          Editar
        </button>,
        <button
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-danger"
        >
          Eliminar
        </button>,
      ];

      return (
        <tr>
          <td>{props.info.apellido}</td>
          <td>{props.info.nombre}</td>
          <td>{props.info.dni}</td>
          <td>{props.info.incorporacion}</td>
          <td className="admin__tables-btn">
            {botones.map((boton) => {
              return boton;
            })}
          </td>
        </tr>
      );
    case "pacientes":
      botones = [
        <button
          onClick={editarPaciente}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-warning"
        >
          Editar
        </button>,
        <button
          onClick={eliminarPaciente}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-danger"
        >
          Eliminar
        </button>,
      ];

      return (
        <tr>
          <td className="admin__tables-avatar">
            <img src={props.info.avatar} alt={props.info.apellido} />
          </td>
          <td>{props.info.apellido}</td>
          <td>{props.info.nombre}</td>
          <td>{props.info.dni}</td>
          <td>{props.info.email}</td>
          <td>{props.info.mascotas.length}</td>
          <td className="admin__tables-btn">
            {botones.map((boton) => {
              return boton;
            })}
          </td>
        </tr>
      );
    case "citasProgramadas":
      botones = [
        <button
          onClick={atenderCita}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-success"
        >
          Atender
        </button>,
        <button
          onClick={cancelarCita}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-danger"
        >
          Cancelar
        </button>,
      ];

      return citas(botones);
    case "citasRegistro":
      botones = [
        <button
          onClick={revisarCita}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-secondary"
        >
          Revisar
        </button>,
      ];

      return citas(botones);
    case "mascotas":
      botones = [
        <button
          onClick={editarMascota}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-warning"
        >
          Editar
        </button>,
        <button
          onClick={eliminarMascota}
          key={Math.round(Math.random() * 10000)}
          className="btn btn-outline-danger"
        >
          Eliminar
        </button>,
      ];

      let edad = getEdad(props.info.fechaNac);

      return (
        <tr>
          <td>{props.info.nombre}</td>
          <td>{props.info.especie}</td>
          <td>{props.info.raza}</td>
          <td>{props.info.fechaNac}</td>
          <td>{edad}</td>
          <td>{props.info.sexo}</td>
          <td>{props.info.plan}</td>
          <td className="admin__tables-btn">
            {botones.map((boton) => {
              return boton;
            })}
          </td>
        </tr>
      );
    default:
      break;
  }
};

export default TablaItem;
