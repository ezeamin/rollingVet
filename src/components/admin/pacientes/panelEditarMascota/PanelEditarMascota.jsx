import React from "react";
import FormularioMascota from "./formularioMascota/FormularioMascota";

const PanelEditarMascota = () => {
  const url = window.location.href;
  const urlSplit = url.split("/");
  const codigo = urlSplit[urlSplit.length - 1];

  let info = {};
  if (codigo !== "new") {
    info = {
      nombre: "Firulais",
      raza: "Pitbull",
      sexo: "Macho",
      fechaNac: "2020-01-01",
      especie: "Perro",
      codigoMascota: "15gt2",
    };
  }

  return (
    <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
      <h1 className="h3__bold">Editar mascota</h1>
      <FormularioMascota info={info} />
    </div>
  );
};

export default PanelEditarMascota;
