import React from "react";
import FormularioMascota from "./formularioMascota/FormularioMascota";

const PanelEditarMascota = (props) => {
  const [info, setInfo] = React.useState({});
  const isNew = (props.codigoMascota === "new");

  React.useEffect(() => {
    if (!isNew) {
      const fetchMascota = async () => {
        const response = await fetch(`/api/pacientes/${props.dni}/${props.codigoMascota}`, {
          method: "GET",
        });
        const data = await response.json();

        setInfo(data.mascota);
      };

      fetchMascota();
    }
  }, []);

  /*React.useEffect(() => {
    console.log(info);
  }, [info]);*/

  if(isNew){
    return (
      <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
        <h1 className="h3__bold">Nueva mascota</h1>
        <FormularioMascota info={info} dni={props.dni} codigoMascota={""}/>
      </div>
    );
  }
  else{
    return (
      <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
        <h1 className="h3__bold">Editar mascota</h1>
        <FormularioMascota info={info} dni={props.dni} codigoMascota={props.codigoMascota}/>
      </div>
    );
  }
};

export default PanelEditarMascota;
