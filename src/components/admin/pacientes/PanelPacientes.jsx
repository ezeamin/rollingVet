import React from "react";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Carga from "../carga/Carga";

const PanelPacientes = () => {
  const navigate = useNavigate();

  const [cargando, setCargando] = React.useState(true);

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
    const response = await fetch("/api/pacientes", {
      method: "GET",
    });
    const data = await response.json();

    setPacientes(data.pacientes.sort());
    setCargando(false);
  };

  const handleClick = () => {
    navigate("/admin/pacientes/new");
  };

  const eliminar = async (dni) => {
    const response = await fetch(`/api/pacientes/${dni}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (data.ok) {
      setPacientes(pacientes.filter((paciente) => paciente.dni !== dni));
      Swal.fire({
        title: "Paciente eliminado",
        text: "El paciente ha sido eliminado correctamente",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "El paciente no pudo ser eliminado",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  React.useEffect(() => {
    fetchPacientes();
  }, []);

  if(cargando) return <Carga />
  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__pacientes">
        <Tabla
          titulo="Pacientes registrados"
          ID="tablaPacientes"
          opciones={opciones}
          info={pacientes}
          type="pacientes"
          eliminar={eliminar}
        />
        <BotonCrear titulo="Agregar paciente" accion={handleClick} />
      </div>
    </div>
  );
};

export default PanelPacientes;
