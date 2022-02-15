import React from "react";
import FormularioCita from "./formularioCita/FormularioCita";
import FormularioCitaPaciente from "./formularioCitaPaciente/FormularioCitaPaciente";
import "./panelNuevaCita.css";
import ListaHorarios from "./listaHorarios/ListaHorarios";
import { useNavigate } from "react-router-dom";
import Error from "../../error/Error";

const horariosFull = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const PanelNuevaCita = (props) => {
  const navigate = useNavigate();

  const isUser = window.location.href.includes("user");

  const [desbloquear, setDesbloquear] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [paciente, setPaciente] = React.useState({
    mascotas: [{}],
  });

  const navigateSuccess = () => {
    if (!isUser) navigate("/admin/citas");
    else navigate("/user/citas");
  };

  const [horarios, setHorarios] = React.useState([]);
  const [fecha, setFecha] = React.useState("");

  React.useEffect(() => {
    if (!isUser) {
      if (desbloquear) {
        document.getElementsByClassName(
          "admin__panel__nuevaCita-forms-cita__disabled"
        )[0].style.display = "none";
      } else
        document.getElementsByClassName(
          "admin__panel__nuevaCita-forms-cita__disabled"
        )[0].style.display = "block";
    } else {
      if (Object.keys(props.user).length !== 0) setPaciente(props.user);
    }
  }, [desbloquear, isUser, props.user]);

  React.useEffect(() => {
    //actualizar horarios
    const abortCont = new AbortController();

    const fetchHorarios = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/fechas/${fecha}`, {
          method: "GET",
          signal: abortCont.signal,
          credentials: "include",
        });

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();

        //mismo dia
        const fechaActual = new Date();
        if (
          fechaActual.getDate().toString() === fecha.split("-")[2] &&
          fechaActual.getMonth() === fecha.split("-")[1] - 1 &&
          fechaActual.getFullYear().toString() === fecha.split("-")[0]
        ) {
          if (fechaActual.getHours() >= 17) setHorarios([]);
          else {
            const hora = fechaActual.getHours();
            const horariosFiltrados = horariosFull.filter(
              (h) => h.split(":")[0] > hora
            );

            console.log(horariosFiltrados);
            setHorarios(horariosFiltrados);
            return;
          }
        }

        if (data.datos === null) {
          setHorarios(horariosFull);
        } else {
          //eliminar de horariosFull los horarios que ya estan en data
          const horariosFullFiltrados = horariosFull.filter(
            (hora) => !data.datos.includes(hora)
          );
          setHorarios(horariosFullFiltrados);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    if (props.user.dni === 0) {
      setError(true);
    } else if (fecha) fetchHorarios();
    else setHorarios([]);

    return () => {
      abortCont.abort();
    };
  }, [fecha,props.user.dni]);

  if (error) return <Error />;
  else if (!isUser) {
    return (
      <div className="container py-5 admin__panel-content">
        <h1 className="h3__bold">Nueva cita</h1>
        <div className="admin__panel__nuevaCita row">
          <div className="admin__panel__nuevaCita-forms col-sm-12 col-md-8">
            <p className="mb-0 p__descripciones">Buscar paciente por DNI</p>
            <FormularioCitaPaciente
              setDesbloquear={setDesbloquear}
              setPaciente={setPaciente}
            />
            <p className="mb-4">
              Paciente:{" "}
              <span className="fw-bold">
                {paciente.nombre} {paciente.apellido}
              </span>
            </p>
            <div className="admin__panel__nuevaCita-forms-cita">
              <div className="admin__panel__nuevaCita-forms-cita__disabled"></div>
              <FormularioCita
                desbloquear={desbloquear}
                paciente={paciente}
                setHorarios={setHorarios}
                horarios={horarios}
                setFecha={setFecha}
                navigateSuccess={navigateSuccess}
              />
            </div>
          </div>
          <div className="admin__panel__nuevaCita-tabla col-sm-12 col-md-4">
            <p className="mb-0 p__descripciones">Horarios disponibles</p>
            <ListaHorarios horarios={horarios} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container py-5 admin__panel-content">
        <h1 className="h3__bold">Nueva cita</h1>
        <div className="admin__panel__nuevaCita row">
          <div className="admin__panel__nuevaCita-forms col-sm-12 col-md-8">
            <div className="admin__panel__nuevaCita-forms-cita">
              <FormularioCita
                desbloquear={true}
                paciente={paciente}
                setHorarios={setHorarios}
                horarios={horarios}
                setFecha={setFecha}
                navigateSuccess={navigateSuccess}
              />
            </div>
          </div>
          <div className="admin__panel__nuevaCita-tabla col-sm-12 col-md-4">
            <p className="mb-0 p__descripciones">Horarios disponibles</p>
            <ListaHorarios horarios={horarios} />
          </div>
        </div>
      </div>
    );
  }
};

export default PanelNuevaCita;
