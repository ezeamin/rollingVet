import React from "react";
import { useNavigate } from "react-router-dom";
import FormularioMascota from "./formularioMascota/FormularioMascota";

const PanelEditarMascota = (props) => {
  const [info, setInfo] = React.useState({});
  const [titulo, setTitulo] = React.useState("");
  const isNew = (props.codigoMascota === "new");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isNew) {
      const fetchMascota = async () => {
        const response = await fetch(`/api/pacientes/${props.dni}/${props.codigoMascota}`, {
          method: "GET",
        });
        const data = await response.json();

        setInfo(data.mascota);
        setTitulo("Editar mascota")
      };

      fetchMascota();
    }
    else setTitulo("Nueva mascota");
  }, [isNew,props.codigoMascota,props.dni]);

  const navigateSuccess = () => {
    navigate(`/admin/pacientes/${props.dni}/mascotas`);
  }

  if(isNew){
    return (
      <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
        <FormularioMascota new={true} titulo={titulo} info={info} dni={props.dni} codigoMascota={""} navigateSuccess={navigateSuccess}/>
      </div>
    );
  }
  else{
    return (
      <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
        <FormularioMascota new={false} titulo={titulo} info={info} dni={props.dni} codigoMascota={props.codigoMascota} navigateSuccess={navigateSuccess}/>
      </div>
    );
  }
};

export default PanelEditarMascota;
