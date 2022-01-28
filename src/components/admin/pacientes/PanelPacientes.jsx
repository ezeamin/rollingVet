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

  const [pacientes, setPacientes] = React.useState([]);

  const fetchPacientes = async () => {
    const response = await fetch("/api/pacientes",{
      method: "GET",
    });
    const data = await response.json();

    setPacientes(data.pacientes);
  }

  const handleClick = () => {
    navigate("/admin/pacientes/new");
  };

  React.useEffect(() => {
    fetchPacientes();
  }, []);

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
