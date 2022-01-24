import React from "react";
import FormularioCita from "./formularioCita/FormularioCita";
import FormularioCitaPaciente from "./formularioCitaPaciente/FormularioCitaPaciente";
import './panelNuevaCita.css';
import ListaHorarios from "./listaHorarios/ListaHorarios";

const PanelNuevaCita = () => {
  const [desbloquear, setDesbloquear] = React.useState(false);
  const [paciente, setPaciente] = React.useState({
    mascotas:[{
      nombre: "",
      raza: "",
      fechaNac: "",
      sexo: "",
    }]
  });

  const [horarios, setHorarios] = React.useState([]);

  React.useEffect(() => {
    if(desbloquear){
      document.getElementsByClassName("admin__panel__nuevaCita-forms-cita__disabled")[0].style.display = "none";
    }
  },[desbloquear]);

  return (
    <div className="container py-5 admin__panel-content">
      <h1 className="h3__bold">Nueva cita</h1>
      <div className="admin__panel__nuevaCita row">
        <div className="admin__panel__nuevaCita-forms col-sm-12 col-md-8">
          <p className="mb-0 p__descripciones">Buscar paciente por DNI</p>
          <FormularioCitaPaciente setDesbloquear={setDesbloquear} setPaciente={setPaciente}/>
          <p className="mb-0">Paciente: <span className="fw-bold">{paciente.nombre} {paciente.apellido}</span></p>
          <div className="admin__panel__nuevaCita-forms-cita position-relative">
            <div className="admin__panel__nuevaCita-forms-cita__disabled"></div>
            <FormularioCita desbloquear={desbloquear} paciente={paciente} setHorarios={setHorarios}/>
          </div>
        </div>
        <div className="admin__panel__nuevaCita-tabla col-sm-12 col-md-4">
          <p className="mb-0 p__descripciones">Horarios disponibles</p>
          <ListaHorarios horarios={horarios}/>
        </div>
      </div>
    </div>
  );
};

export default PanelNuevaCita;
