import React from "react";
import { useNavigate } from "react-router-dom";
import "./panelCitas.css";
import Tabla from "../tabla/Tabla";
import BotonCrear from "../botonCrear/BotonCrear";
import Carga from "../carga/Carga";
import Swal from "sweetalert2";
import Error from "../error/Error";
import BotonCargarMas from "../botonCargarMas/BotonCargarMas";
import restablecerPos from "../../../js/restablecerPos";

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
  const [minProg, setMinProg] = React.useState(0);
  const [minReg, setMinReg] = React.useState(0);

  const handleClick = () => {
    if (!isUser) navigate("/admin/citas/new");
    else navigate("/user/citas/new");
  };

  const cargarMas = async (categoria) => {
    let response;

    if (isUser) {
      if (categoria === "citasProgramadas") {
        response = await fetch(
          process.env.REACT_APP_SERVER_URL +
            `/api/${categoria}/user/dni/${props.user.dni}/${minProg}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
      } else {
        response = await fetch(
          process.env.REACT_APP_SERVER_URL +
            `/api/${categoria}/user/dni/${props.user.dni}/${minReg}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
      }
    } else {
      if (categoria === "citasProgramadas") {
        response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/${categoria}/${minProg}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
      } else {
        response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/api/${categoria}/${minReg}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
      }
    }

    const data = await response.json();
    const citas = data.citas;
    if (categoria === "citasProgramadas") {
      if (citas.length !== 0)
        setCitasProgramadas([...citasProgramadas, ...citas]);

      if (citas.length < 3) {
        let boton = document.getElementById("botonCargarMasProgramadas");

        boton.disabled = true;
        boton.onclick = null;
      } else {
        setMinProg(minProg + 3);
      }
    } else {
      if (citas.length !== 0) setCitasRegistro([...citasRegistro, ...citas]);

      if (citas.length < 3) {
        let boton = document.getElementById("botonCargarMasRegistro");

        boton.disabled = true;
        boton.onclick = null;
      } else {
        setMinReg(minReg + 3);
      }
    }
  };

  React.useEffect(() => {
    try {
      if (citasProgramadas.length === 0) {
        let boton = document.getElementById("botonCargarMasProgramadas");
        boton.style.display = "none";
      }

      if (citasRegistro.length === 0) {
        let boton = document.getElementById("botonCargarMasRegistro");
        boton.style.display = "none";
      }
    } catch (err) {}

    if (minProg > 3 || minReg > 3) restablecerPos();
  }, [minProg, minReg, citasProgramadas, citasRegistro]);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchCitasProgramadas = async () => {
      try {
        if (!isUser) {
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL +
              `/api/citasProgramadas/${minProg}`,
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
          setCitasProgramadas(data.citas);
          setMinProg(minProg + 3);
        } else {
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL +
              `/api/citasProgramadas/user/dni/${props.user.dni}/${minProg}`,
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
          setCitasProgramadas(data.citas);
          setMinProg(minProg + 3);
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
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL + `/api/citasRegistro/${minReg}`,
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
          setCitasRegistro(data.citas);
          setMinReg(minReg + 3);
        } else {
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL +
              `/api/citasRegistro/user/dni/${props.user.dni}/${minReg}`,
            {
              method: "GET",
              credentials: "include",
              signal: abortCont.signal,
            }
          );
          const data = await response.json();
          setCitasRegistro(data.citas);
          setMinReg(minReg + 3);
        }
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
    } else if (props.user.dni) {
      fetchCitasProgramadas();
      fetchCitasRegistro();
    }

    return () => {
      abortCont.abort();
    };
  }, [isUser, props.user.dni]);

  const eliminarCita = async (codigoCita) => {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/api/citas/${codigoCita}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
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
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL + "/api/citasProgramadas/0",
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          setCitasProgramadas(data.citas);
        } else {
          const response = await fetch(
            process.env.REACT_APP_SERVER_URL +
              `/api/citasProgramadas/${props.user.dni}/0`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const data = await response.json();
          setCitasProgramadas(data.citas);
        }

        setMinProg(0);
      });
    }
  };

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div
      className="container py-5 admin__panel-content"
      id="admin__panel-content-list"
    >
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
      <div className="d-flex justify-content-end">
        <BotonCargarMas
          accion={() => cargarMas("citasProgramadas")}
          tipo={"programadas"}
        />
        <BotonCrear titulo="Agregar cita" accion={handleClick} />
      </div>
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
        <BotonCargarMas
          accion={() => cargarMas("citasRegistro")}
          tipo={"registro"}
        />
      </div>
    </div>
  );
};

export default PanelCitas;
