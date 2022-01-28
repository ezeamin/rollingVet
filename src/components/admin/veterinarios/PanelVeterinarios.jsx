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
      codigo: "PyG98",
    },
    {
      apellido: "Dido",
      nombre: "Esteban",
      dni: "87654321",
      incorporacion: "26/07/2019",
      codigo: "1RG95",
    },
  ];

  const showAlert = () => {
    alert("En un futuro esto permite agregar un veterinario");
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
          eliminar={() => {}}
        />
        <BotonCrear titulo="Agregar veterinario" accion={showAlert} />
      </div>
    </div>
  );
};

export default PanelVeterinarios;
