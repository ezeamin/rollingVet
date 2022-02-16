import React from "react";
import BotonCrear from "../../botonCrear/BotonCrear";
import Tabla from "../../tabla/Tabla";
import { useNavigate } from "react-router";
import Carga from "../../carga/Carga";
import Swal from "sweetalert2";
import Error from "../../error/Error";

const opciones = [
  "Nombre",
  "Especie",
  "Raza",
  "Fecha de nacimiento",
  "Edad (años)",
  "Sexo",
  "Plan",
  "Acciones",
];

const PanelMascotas = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = React.useState({ mascotas: [] });
  const [titulo, setTitulo] = React.useState("");
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPaciente = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/pacientes/${props.dni}`,
          {
            method: "GET",
            signal: abortCont.signal,
            credentials: "include",
          }
        );

        if (!response.ok) {
          setCargando(false);
          setError(true);
          return;
        }

        const data = await response.json();

        setInfo(data.paciente);
        setCargando(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    if (props.user.dni === 0) {
      setCargando(false);
      setError(true);
    } else fetchPaciente();

    return () => {
      abortCont.abort();
    };
  }, [props.dni, props.user.dni]);

  React.useEffect(() => {
    if (info.nombre !== undefined) {
      setTitulo("Mascotas de " + info.nombre);
    }
  }, [info]);

  const eliminar = async (codigoMascota) => {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL +
        `/api/pacientes/${props.dni}/${codigoMascota}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await res.json();

    if (data.ok) {
      Swal.fire({
        title: "Mascota eliminada",
        text: " ",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        const fetchPaciente = async () => {
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL + `/api/pacientes/${props.dni}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();

          setInfo(data.paciente);
        };

        fetchPaciente();
      });
    }
  };

  const handleClick = () => {
    if (window.location.href.includes("admin"))
      navigate(`/admin/pacientes/${props.dni}/mascotas/new`);
    else navigate("/user/perfil/mascotas/new");
  };

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div className="admin__panel-content container">
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
