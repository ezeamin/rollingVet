import React from "react";
import BotonCrear from "../../botonCrear/BotonCrear";
import Tabla from "../../tabla/Tabla";
import { useNavigate } from "react-router";
import Carga from "../../carga/Carga";

const opciones = [
  "Nombre",
  "Especie",
  "Raza",
  "Fecha de nacimiento",
  "Edad (años)",
  "Sexo",
  "Plan",
  "Acciones"
];

const PanelMascotas = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = React.useState({ mascotas: [] });
  const [titulo, setTitulo] = React.useState("");
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const fetchPaciente = async () => {
      const response = await fetch(`/api/pacientes/${props.dni}`, {
        method: "GET",
      });
      const data = await response.json();

      setInfo(data.paciente);
      setCargando(false);
    };

    fetchPaciente();
  }, [props.dni]);

  React.useEffect(() => {
    if(info.nombre!==undefined){
      setTitulo("Mascotas de " + info.nombre);
    }
  }, [info]);

  const eliminar = async (codigoMascota) => {}

  const handleClick = () => {
    if(window.location.href.includes("admin")) navigate(`/admin/pacientes/${props.dni}/mascotas/new`);
    else navigate("/user/perfil/mascotas/new");
  };

  if(cargando) return <Carga />;
  return (
    <div className="admin__panel-content container py-5">
      <Tabla
        titulo={titulo}
        ID="tablaMascotas"
        opciones={opciones}
        info={info.mascotas}
        type="mascotas"
        eliminar={eliminar}
      />
      <BotonCrear titulo="Agregar mascota" accion={handleClick} />
    </div>
  );
};

export default PanelMascotas;
