import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormularioRegistro from "../../components/registro/formularioRegistro/FormularioRegistro";
import Header from "../../components/registro/header/HeaderRegistro";
import "./registro.css";

const Registro = (props) => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = React.useState(
    "https://mulder-onions.com/wp-content/uploads/2017/02/White-square.jpg"
  );
  //el link es una imagen en blanco para esperar el avatar

  const randomSeed = Math.floor(Math.random() * 99999) + 2;

  //creacion del avatar
  let gen;
  if ((randomSeed % 10) % 2 === 0) gen = "male";
  else gen = "female";
  const [genero, setGenero] = React.useState(gen);

  React.useEffect(() => {
    const generateAvatar = () => {
      const url = `https://avatars.dicebear.com/api/${genero}/${randomSeed}.svg`;

      setAvatarUrl(url);
    };

    generateAvatar();
  }, []);

  React.useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated, navigate]);

  const changeAvatar = (nuevoGenero) => {
    if (nuevoGenero === "Masculino") nuevoGenero = "male";
    else if (nuevoGenero === "Femenino") nuevoGenero = "female";
    else return;

    if (nuevoGenero === genero) return;

    const url = `https://avatars.dicebear.com/api/${nuevoGenero}/${randomSeed}.svg`;
    setGenero(nuevoGenero);
    setAvatarUrl(url);
  };

  const navigateSuccess = () => {
    navigate("/");
  };

  return (
    <div className="registro__container">
      <Header />
      <main className="main__registro">
        <div className="main__registro-content">
          <div className="titulos__registro">
            <div>
              <h3 className="h3__bold mb-0">Bienvenido</h3>
              <p className="p__registro">Ingrese sus datos</p>
            </div>
            <div>
              <img
                src={avatarUrl}
                alt="avatar del usuario"
                className="avatar"
              />
            </div>
          </div>
          <FormularioRegistro
            avatar={avatarUrl}
            changeAvatar={changeAvatar}
            seed={randomSeed}
            navigateSuccess={navigateSuccess}
            setIsAuthenticated={props.setIsAuthenticated}
            isAdmin={false}
          />
          <p className="mt-3 fs-6 tyc__p">
            Al registrarte, aceptas los{" "}
            <Link to="#" className="tyc">
              terminos y condiciones
            </Link>{" "}
            del sitio.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Registro;
