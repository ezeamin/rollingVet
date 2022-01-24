import React from "react";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import { useNavigate } from "react-router";

const PanelPacientes = () => {
  const navigate = useNavigate();

  const opciones = [
    "Apellido",
    "Nombre",
    "DNI",
    "E-mail",
    "Mascotas",
    "Acciones",
  ];

  const pacientes = [
    {
      apellido: "Perez",
      nombre: "Juan",
      dni: "12345678",
      email: "juanperez@gmail.com",
      mascotas: "2",
      codigo: "aik98",
    },
  ];

  const handleClick = () => {
    navigate("/admin/pacientes/new");
  };

  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__pacientes">
        <Tabla
          titulo="Pacientes registrados"
          ID="tablaPacientes"
          opciones={opciones}
          info={pacientes}
          type="pacientes"
        />
        <BotonCrear titulo="Agregar paciente" accion={handleClick} />
      </div>
    </div>
  );
};

export default PanelPacientes;
