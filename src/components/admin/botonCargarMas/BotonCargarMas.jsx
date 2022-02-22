import React from "react";

const BotonCargarMas = (props) => {
  let id;

  switch (props.tipo) {
    case "pacientes":
      id = "botonCargarMasPacientes";
      break;
    case "programadas":
      id = "botonCargarMasProgramadas";
      break;
    case "registro":
      id = "botonCargarMasRegistro";
      break;
    default:
      id = "botonCargarMas";
      break;
  }

  return (
    <div className="admin__panel-btn mt-3 mx-2">
      <button
        className="btn btn-outline-secondary"
        id={id}
        onClick={props.accion}
      >
        Cargar mas
      </button>
    </div>
  );
};

export default BotonCargarMas;
