import React from "react";
import BotonCrear from "../../botonCrear/BotonCrear";
import Tabla from "../../tabla/Tabla";
import { useNavigate } from "react-router";

const PanelMascotas = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = React.useState({ mascotas: [] });
  const [titulo, setTitulo] = React.useState("");

  React.useEffect(() => {
    //CARGAR INFO
    setInfo({
      //SACAR Y TRAER ESTOS DATOS DESDE EL CODIGO DE PROPS
      apellido: "Perez",
      nombre: "Juan",
      dni: "12345678",
      email: "juanperez@gmail.com",
      mascotas: [
        {
          nombre: "Mascota 1",
          especie: "Perro",
          raza: "Labrador",
          fechaNacimiento: "01/01/2020",
          edad: "1", //CALCULAR EDAD
          sexo: "Macho",
          codigoMascota: "pp3A4",
        },
      ],
      genero: "Masculino",
      contraseña: "12345678",
    });
  }, []);

  React.useEffect(() => {
    setTitulo("Mascotas de " + info.nombre);
  }, [info]);

  const opciones = [
    "Nombre",
    "Especie",
    "Raza",
    "Fecha de nacimiento",
    "Edad (años)",
    "Sexo",
  ];

  const handleClick = () => {
    navigate(`/admin/pacientes/${props.codigo}/mascotas/new`);
  };

  return (
    <div className="admin__panel-content container py-5">
      <Tabla
        titulo={titulo}
        ID="tablaMascotas"
        opciones={opciones}
        info={info.mascotas}
        type="mascotas"
      />
      <BotonCrear titulo="Agregar mascota" accion={handleClick} />
    </div>
  );
};

export default PanelMascotas;
