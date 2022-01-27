import React from "react";
import { useNavigate } from "react-router-dom";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";

const PanelCitas = () => {
  const navigate = useNavigate();
  const [citasProgramadas, setCitasProgramadas] = React.useState([]);
  const [citasRegistro, setCitasRegistro] = React.useState([]);

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
    console.log(data);
    setCitasProgramadas(data.citas);
  };

  const fetchCitasRegistro = async () => {
    const response = await fetch("/api/citasRegistro", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setCitasRegistro(data.citas);
  };

  /*const citasProgramadas = [{
    nombre: "Juan Perez",
    mascota: "Geru",
    veterinario: "-",
    dia: "24/01/2022",
    horario: "10:00",
    codigo: "10ao6",
  }];

  const citasRegistro = [{
    nombre: "Pepe Dominguez",
    mascota: "Firulais",
    veterinario: "Capunta",
    dia: "21/01/2022",
    horario: "10:00",
    codigo: "3Tk2i",
  }];*/

  const handleClick = () => {
    navigate("/admin/citas/new");
  };

  React.useEffect(() => {
    fetchCitasProgramadas();
    fetchCitasRegistro();
  }, []);

  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__citas-prog">
        <Tabla
          titulo="Citas programadas"
          ID="tablaCitasProgramadas"
          opciones={opciones}
          info={citasProgramadas}
          type="citasProgramadas"
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
        />
      </div>
    </div>
  );
};

export default PanelCitas;
