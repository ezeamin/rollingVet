import React from "react";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";

const PanelCitas = () => {
  const opciones = [
    "Nombre",
    "Mascota",
    "Veterinario",
    "Dia",
    "Horario",
    "Acciones",
  ];

  const citasProgramadas = [{
    nombre: "Juan",
    mascota: "Geru",
    veterinario: "-",
    dia: "24/01/2022",
    horario: "10:00",
  }];

  const citasRegistro = [{
    nombre: "Pepe",
    mascota: "Firulais",
    veterinario: "Capunta",
    dia: "21/01/2022",
    horario: "10:00",
  }];

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
      <BotonCrear titulo="Agregar cita" accion={() => {}} />
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
