import React from "react";
import FormularioRegistro from "../../../registro/formularioRegistro/FormularioRegistro";
import { useNavigate } from "react-router-dom";
import Error from "../../error/Error";
import Carga from "../../carga/Carga";

const PanelEditarPaciente = (props) => {
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = React.useState("https://mulder-onions.com/wp-content/uploads/2017/02/White-square.jpg");
  const [info, setInfo] = React.useState({});
  const [error, setError] = React.useState(false);
  const [cargando, setCargando] = React.useState(true);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPaciente = async () => {
      try {
        if (props.dni !== "new") {
          const res = await fetch(
            process.env.REACT_APP_SERVER_URL + `/api/paciente/${props.dni}`,
            {
              method: "GET",
              signal: abortCont.signal,
              credentials: "include",
            }
          );

          if (!res.ok) {
            setError(true);
            return;
          }

          const data = await res.json();
          setInfo(data.paciente);
          setAvatarUrl(data.paciente.avatar);
          setCargando(false);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    if (props.user.dni === 0) {
      setError(true);
      setCargando(false);
    } else fetchPaciente();

    return () => {
      abortCont.abort();
    };
  }, [props.dni, props.user.dni]);

  const redirectMascotas = () => {
    navigate(`/admin/pacientes/${props.dni}/mascotas`);
  };

  const navigateSuccess = () => {
    navigate("/admin/pacientes");
  };

  React.useEffect(() => {
    const generateAvatar = () => {
      let gen;
      const randomSeed = Math.floor(Math.random() * 99999) + 2;
      if ((randomSeed % 10) % 2 === 0) gen = "male";
      else gen = "female";

      const url = `https://avatars.dicebear.com/api/${gen}/${randomSeed}.svg?mood=happy`; //skinColor=variant01

      setAvatarUrl(url);
    };

    if (props.dni === "new") generateAvatar();
  }, [props.dni]);

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
  else if (error) return <Error />;
  else if (props.dni !== "new") {
    return (
      <div className="admin__panel__pacientes-editarUser py-5 admin__panel__pacientes-content">
        <div>
          <div className="user__perfil-panelTitulos">
            <h1 className="mb-0 h3__bold">Editar perfil</h1>
            <div className="user__perfil-avatar mb-2">
              <img src={avatarUrl} alt="avatar del usuario" className="w-100" />
            </div>
          </div>
          <div className="admin__panel__pacientes-editarUser-form">
            <FormularioRegistro
              info={info}
              navigateSuccess={navigateSuccess}
              changeAvatar={changeAvatar}
              avatar={avatarUrl}
              navigatePass={(link)=>navigate(link)}
            />
          </div>
        </div>
        <div className="admin__panel__pacientes-editarUser-mascotas">
          <button
            type="button"
            onClick={redirectMascotas}
            className="admin__panel__pacientes-editarUser-btnMascotas"
          >
            <img src="/img/favicon.png" alt="Rolling vet logo" />
          </button>
          <p className="p__descripciones">Mascotas</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
        <div className="user__perfil-panelTitulos">
          <h1 className="mb-0 h3__bold">Nuevo paciente</h1>
          <div className="user__perfil-avatar mb-2">
            <img src={avatarUrl} alt="avatar del usuario" className="w-100" />
          </div>
        </div>
        <div className="admin__panel__pacientes-newUser-form">
          <FormularioRegistro
            avatar={avatarUrl}
            changeAvatar={changeAvatar}
            navigateSuccess={navigateSuccess}
            setIsAuthenticated={() => {}}
            isAdmin={true}
            navigatePass={()=>{}}
          />
        </div>
      </div>
    );
  }
};

export default PanelEditarPaciente;
