import React from "react";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carga from "../carga/Carga";
import Error from "../error/Error";

const comparar = (a, b) => {
  if (a.apellido === b.apellido) {
    return a.nombre > b.nombre ? 1 : -1;
  } else if (a.apellido > b.apellido) {
    return 1;
  } else if (a.apellido < b.apellido) {
    return -1;
  }
};

const opciones = [
  "Avatar",
  "Apellido",
  "Nombre",
  "DNI",
  "E-mail",
  "Mascotas",
  "Acciones",
];

const PanelPacientes = (props) => {
  const navigate = useNavigate();

  const [cargando, setCargando] = React.useState(true);
  const [pacientes, setPacientes] = React.useState([]);
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    navigate("/admin/pacientes/new");
  };

  const eliminar = async (dni) => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/pacientes/${dni}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();

    if (data.ok) {
      setPacientes(pacientes.filter((paciente) => paciente.dni !== dni));

      const res = await fetch(process.env.REACT_APP_SERVER_URL+`/api/citas/paciente/${dni}`, {
        method: "DELETE",
        credentials: "include",
      });

      Swal.fire({
        title: "Paciente eliminado",
        text: "El paciente ha sido eliminado correctamente",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "El paciente no pudo ser eliminado",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPacientes = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+"/api/pacientes", {
          method: "GET",
          signal: abortCont.signal,
          credentials: "include",
        });

        if (!response.ok) {
          setCargando(false);
          setError(true);
          return;
        }

        const data = await response.json();

        setPacientes(data.pacientes.sort((a, b) => comparar(a, b)));
        setCargando(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    if(props.user.dni === 0){
      setCargando(false);
      setError(true);
    }
    else fetchPacientes();

    return () => {
      abortCont.abort();
    };
  }, [props.user.dni]);

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div className="container admin__panel-content">
      <div className="admin__panel__pacientes">
        <Tabla
          titulo="Pacientes registrados"
          ID="tablaPacientes"
          opciones={opciones}
          info={pacientes}
          type="pacientes"
          eliminar={eliminar}
        />
        <BotonCrear titulo="Agregar paciente" accion={handleClick} />
      </div>
    </div>
  );
};

export default PanelPacientes;
