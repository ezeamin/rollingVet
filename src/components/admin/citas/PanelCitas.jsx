import React from "react";
import { useNavigate } from "react-router-dom";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import Carga from "../carga/Carga";
import Swal from "sweetalert2";
import Error from "../error/Error";

const opciones = [
  "Avatar",
  "Nombre",
  "Mascota",
  "Veterinario",
  "Dia",
  "Horario",
  "Acciones",
];

const PanelCitas = (props) => {
  const navigate = useNavigate();
  const [citasProgramadas, setCitasProgramadas] = React.useState([]);
  const [citasRegistro, setCitasRegistro] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);
  const isUser = window.location.href.includes("user");

  const handleClick = () => {
    if (!isUser) navigate("/admin/citas/new");
    else navigate("/user/citas/new");
  };

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchCitasProgramadas = async () => {
      try {
        if (!isUser) {
          const response = await fetch("/api/citasProgramadas", {
            method: "GET",
            signal: abortCont.signal,
          });

          if (!response.ok) {
            setCargando(false);
            setError(true);
            return;
          }
  
          const data = await response.json();
          setCitasProgramadas(data.citas);
        } else {
          const response = await fetch(
            `/api/citasProgramadas/${props.user.dni}`,
            {
              method: "GET",
              signal: abortCont.signal,
            }
          );

          if (!response.ok) {
            setCargando(false);
            setError(true);
            return;
          }

          const data = await response.json();
          setCitasProgramadas(data.citas);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };

    const fetchCitasRegistro = async () => {
      try {
        if (!isUser) {
          const response = await fetch("/api/citasRegistro", {
            method: "GET",
            signal: abortCont.signal,
          });
          
          if (!response.ok) {
            setCargando(false);
            setError(true);
            return;
          }

          const data = await response.json();
          setCitasRegistro(data.citas.reverse());
        } else {
          const response = await fetch(`/api/citasRegistro/${props.user.dni}`, {
            method: "GET",
            signal: abortCont.signal,
          });
          const data = await response.json();
          setCitasRegistro(data.citas.reverse());
        }
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
    else {
      fetchCitasProgramadas();
      fetchCitasRegistro();
    }

    return () => {
      abortCont.abort();
    };
  }, [isUser,props.user.dni]);

  const eliminarCita = async (codigoCita) => {
    const response = await fetch(`/api/citas/${codigoCita}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.ok) {
      Swal.fire({
        title: "Cita eliminada",
        text: " ",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 2000,
      }).then(async () => {
        if (!isUser) {
          const response = await fetch("/api/citasProgramadas", {
            method: "GET",
          });
          const data = await response.json();
          setCitasProgramadas(data.citas);
        } else {
          const response = await fetch(
            `/api/citasProgramadas/${props.user.dni}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          setCitasProgramadas(data.citas);
        }
      });
    }
  };

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div className="container py-5 admin__panel-content">
      <div className="admin__panel__citas-prog">
        <Tabla
          titulo="Citas programadas"
          ID="tablaCitasProgramadas"
          opciones={opciones}
          info={citasProgramadas}
          type="citasProgramadas"
          eliminar={eliminarCita}
          isUser={isUser}
        />
      </div>
      <BotonCrear titulo="Agregar cita" accion={handleClick} />
      <div className="admin__panel__citas-registro mt-4">
        <Tabla
          titulo="Registro de citas"
          ID="tablaCitasRegistro"
          opciones={opciones}
          info={citasRegistro}
          type="citasRegistro"
          eliminar={() => {}}
          isUser={isUser}
        />
      </div>
    </div>
  );
};

export default PanelCitas;
