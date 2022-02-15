import React from "react";
import { useNavigate } from "react-router-dom";
import Carga from "../../admin/carga/Carga";
import './panelPerfil.css';
import Error from "../../admin/error/Error";
import FormularioRegistro from "../../registro/formularioRegistro/FormularioRegistro";

const PanelPerfil = (props) => {
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [info, setInfo] = React.useState({});
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [nombreCompleto, setNombreCompleto] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    const abortCont = new AbortController();

    const traerInfo = async () => {
      try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+`/api/pacientes/${props.user.dni}`, {
        method: "GET",
        signal: abortCont.signal,
        credentials: "include",
      });
      const data = await res.json();

      setInfo(data.paciente);
      setCargando(false);
      setNombreCompleto(`${data.paciente.nombre} ${data.paciente.apellido}`);
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
    else if (props.user.dni) traerInfo();

    return () => {
      abortCont.abort();
    };
  }, [props.user.dni]);

  const navigateSuccess = () => {
    navigate("/user");
  };

  const redirectMascotas = () => {
    navigate(`/user/perfil/mascotas`);
  };

  const redirectPlanes = () => {
    navigate(`/user/perfil/planes`);
  };

  const changeAvatar = (gen) => {
    let genero;
    if (gen === "Masculino") {
      genero = "male";
    } else {
      genero = "female";
    }

    const randomSeed = Math.floor(Math.random() * 99999) + 2;

    setAvatarUrl(
      `https://avatars.dicebear.com/api/${genero}/${randomSeed}.svg`
    );
  };

  if (cargando) return <Carga />;
  else if(error) return <Error />;
  return (
    <div className="admin__panel__pacientes-editarUser user__panel__pacientes-editarUser admin__panel__pacientes-content">
      <div className="admin__panel__pacientes-editarUser-form">
        <h1 className="mb-3 h3__bold">{nombreCompleto}</h1>
        <FormularioRegistro
          info={info}
          navigateSuccess={navigateSuccess}
          changeAvatar={changeAvatar}
          titulo={nombreCompleto}
        />
      </div>
      <div className="user__panel__editarUser-botones">
        <div className="admin__panel__pacientes-editarUser-mascotas mb-2">
          <button
            type="button"
            onClick={redirectMascotas}
            className="admin__panel__pacientes-editarUser-btnMascotas"
          >
            <img src="/img/favicon.png" alt="Rolling vet logo" />
          </button>
          <p className="p__descripciones">Mascotas</p>
        </div>
        <div className="admin__panel__pacientes-editarUser-mascotas">
          <button
            type="button"
            onClick={redirectPlanes}
            className="admin__panel__pacientes-editarUser-btnMascotas"
          >
            <i className="fa fa-dollar-sign fa-3x"></i>
          </button>
          <p className="p__descripciones">Planes</p>
        </div>
      </div>
    </div>
  );
};

export default PanelPerfil;
