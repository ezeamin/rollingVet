import React from "react";
import FormularioRegistro from "../../components/registro/formularioRegistro/FormularioRegistro";
import Header from "../../components/registro/header/HeaderRegistro";
import "./registro.css";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/pixel-art";

const Registro = () => {
  const [avatarUrl, setAvatarUrl] = React.useState("");

  const randomSeed = Math.floor(Math.random() * 99999) + 2;

  React.useEffect(() => {
    generateAvatar();
  }, []);

  const generateAvatar = async () => {
    let genero;
    if ((randomSeed % 10) % 2 === 0) genero = "male";
    else genero = "female";

    const url = `https://avatars.dicebear.com/api/${genero}/${randomSeed}.svg`;

    setAvatarUrl(url);
  };

  const changeAvatar = (genero) => {
    if (genero === "Masculino") genero = "male";
    else genero = "female";

    const url = `https://avatars.dicebear.com/api/${genero}/${randomSeed}.svg`;
    setAvatarUrl(url);
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
        <FormularioRegistro changeAvatar={changeAvatar} seed={randomSeed} />
        <p className="mt-3 fs-6 tyc__p">
          Al registrarte, aceptas los{" "}
          <a href="#" className="tyc">
            terminos y condiciones
          </a>{" "}
          del sitio.
        </p>
        </div>
      </main>
    </div>
  );
};

export default Registro;
