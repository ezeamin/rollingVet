import React from "react";
import BotonCrear from "../botonCrear/BotonCrear";
import Tabla from "../tabla/Tabla";

const PanelVeterinarios = () => {
  const opciones = ["Apellido", "Nombre", "DNI", "Incorporacion", "Acciones"];

  const veterinarios = [
    {
      apellido: "Capunta",
      nombre: "Elsa",
      dni: "12345678",
      incorporacion: "12/12/2020",
    },
    {
      apellido: "Dido",
      nombre: "Esteban",
      dni: "87654321",
      incorporacion: "26/07/2019",
    },
  ];

  const showAlert = (e) => {
    alert("En un futuro esto va a ser una ventana modal");
  };

  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__veterinarios">
        <Tabla
          titulo="Veterinarios registrados"
          ID="tablaVeterinarios"
          opciones={opciones}
          info={veterinarios}
          type="veterinarios"
        />
        <BotonCrear titulo="Agregar veterinario" accion={showAlert} />
      </div>
    </div>
  );
};

export default PanelVeterinarios;
