import React from "react";
import { useNavigate } from "react-router-dom";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import Carga from "../carga/Carga";

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
    setCitasRegistro(data.citas);
    setCargando(false);
  };

  const handleClick = () => {
    navigate("/admin/citas/new");
  };

  React.useEffect(() => {
    fetchCitasProgramadas();
    fetchCitasRegistro();
  }, []);

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
          eliminar={() => {}} //MODIFICAR
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
          eliminar={() => {}} //MODIFICAR
        />
      </div>
    </div>
  );
};

export default PanelCitas;
