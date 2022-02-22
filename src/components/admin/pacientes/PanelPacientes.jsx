import React from "react";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Carga from "../carga/Carga";
import Error from "../error/Error";
import BotonCargarMas from "../botonCargarMas/BotonCargarMas";
import restablecerPos from "../../../js/restablecerPos";

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
  const [min, setMin] = React.useState(0);

  const handleClick = () => {
    navigate("/admin/pacientes/new");
  };

  const cargarMas = async () => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/api/pacientes/${min}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    setPacientes([...pacientes, ...data.pacientes]);

    if (data.pacientes.length < 5) {
      let boton = document.getElementById("botonCargarMas");

      boton.disabled = true;
      boton.onclick = null;
    } else{
      setMin(min + 5);
    }

    if (min > 10) restablecerPos();
  };

  const eliminar = async (dni) => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/api/pacientes/${dni}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await response.json();

    if (data.ok) {
      setPacientes(pacientes.filter((paciente) => paciente.dni !== dni));

      await fetch(
        process.env.REACT_APP_SERVER_URL + `/api/citas/paciente/${dni}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

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
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/pacientes/${min}`,
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
        setPacientes(data.pacientes);
        setCargando(false);
        setMin(min + 5);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    if (props.user.dni === 0) {
      setCargando(false);
      setError(true);
    } else fetchPacientes();

    return () => {
      abortCont.abort();
    };
  }, [props.user.dni]);

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div
      className="container admin__panel-content"
      id="admin__panel-content-list"
    >
      <div className="admin__panel__pacientes">
        <Tabla
          titulo="Pacientes registrados"
          ID="tablaPacientes"
          opciones={opciones}
          info={pacientes}
          type="pacientes"
          eliminar={eliminar}
        />
        <div className="d-flex justify-content-end">
          <BotonCargarMas accion={cargarMas} />
          <BotonCrear titulo="Agregar paciente" accion={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default PanelPacientes;
