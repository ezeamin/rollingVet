import React from "react";
import { useNavigate } from "react-router-dom";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import Carga from "../carga/Carga";
import Swal from "sweetalert2";

const PanelCitas = () => {
  const navigate = useNavigate();
  const [citasProgramadas, setCitasProgramadas] = React.useState([]);
  const [citasRegistro, setCitasRegistro] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);

  const opciones = [
    "Nombre",
    "Mascota",
    "Veterinario",
    "Dia",
    "Horario",
    "Acciones",
  ];

  const fetchCitasProgramadas = async () => {
    const response = await fetch("/api/citasProgramadas", {
      method: "GET",
    });
    const data = await response.json();
    setCitasProgramadas(data.citas);
  };

  const fetchCitasRegistro = async () => {
    const response = await fetch("/api/citasRegistro", {
      method: "GET",
    });
    const data = await response.json();
    setCitasRegistro(data.citas.reverse());
    setCargando(false);
  };

  const handleClick = () => {
    navigate("/admin/citas/new");
  };

  React.useEffect(() => {
    fetchCitasProgramadas();
    fetchCitasRegistro();
  }, []);

  const eliminarCita = async (codigoCita) => {
    const response = await fetch(`/api/citas/${codigoCita}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.ok) {
      Swal.fire({
        title: "Cita eliminada",
        text: " ",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
      fetchCitasProgramadas();
    }
  }

  if(cargando) return <Carga />
  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__citas-prog">
        <Tabla
          titulo="Citas programadas"
          ID="tablaCitasProgramadas"
          opciones={opciones}
          info={citasProgramadas}
          type="citasProgramadas"
          eliminar={eliminarCita} //MODIFICAR
        />
      </div>
      <BotonCrear titulo="Agregar cita" accion={handleClick} />
      <div className="admin__panel__citas-registro mt-4">
        <Tabla
          titulo="Registro de citas"
          ID="tablaCitasRegistro"
          opciones={opciones}
          info={citasRegistro}
          type="citasRegistro"
          eliminar={() => {}}
        />
      </div>
    </div>
  );
};

export default PanelCitas;
