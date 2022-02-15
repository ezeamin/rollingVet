import React from "react";
import FormularioRegistro from "../../../registro/formularioRegistro/FormularioRegistro";
import { useNavigate } from "react-router-dom";
import Error from "../../error/Error";

const PanelEditarPaciente = (props) => {
  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [info, setInfo] = React.useState({});
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const abortCont = new AbortController();

    const fetchPaciente = async () => {
      try {
        if (props.dni !== "new") {
          const res = await fetch(process.env.REACT_APP_SERVER_URL+`/api/pacientes/${props.dni}`, {
            method: "GET",
            signal: abortCont.signal,
          });

          if (!res.ok) {
            setError(true);
            return;
          }

          const data = await res.json();
          setInfo(data.paciente);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    if(props.user.dni === 0){
      setError(true);
    }
    else fetchPaciente();

    return () => {
      abortCont.abort();
    };
  }, [props.dni,props.user.dni]);

  const redirectMascotas = () => {
    navigate(`/admin/pacientes/${props.dni}/mascotas`);
  };

  const navigateSuccess = () => {
    navigate("/admin/pacientes");
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

  if (error) return <Error />;
  else if (props.dni !== "new") {
    return (
      <div className="admin__panel__pacientes-editarUser py-5 admin__panel__pacientes-content">
        <div>
          <h1 className="mb-3 h3__bold">Editar perfil</h1>
          <div className="admin__panel__pacientes-editarUser-form">
            <FormularioRegistro
              info={info}
              navigateSuccess={navigateSuccess}
              changeAvatar={changeAvatar}
              avatar={info.avatar}
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
        <h1 className="mb-3 h3__bold">Agregar paciente</h1>
        <div className="admin__panel__pacientes-newUser-form">
          <FormularioRegistro
            avatar={avatarUrl}
            changeAvatar={changeAvatar}
            navigateSuccess={navigateSuccess}
            setIsAuthenticated={() => {}}
            isAdmin={true}
          />
        </div>
      </div>
    );
  }
};

export default PanelEditarPaciente;
