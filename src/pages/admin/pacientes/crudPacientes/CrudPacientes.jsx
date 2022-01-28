import React from "react";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import FormularioRegistro from "../../../../components/registro/formularioRegistro/FormularioRegistro";
import "./crudPacientes.css";
import { useNavigate } from "react-router-dom";
import FormularioEditarPaciente from "../../../../components/admin/pacientes/formularioEditarPaciente/FormularioEditarPaciente";

const CrudPacientes = (props) => {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlSplit = url.split("/");
  const dni = urlSplit[urlSplit.length - 1];

  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [info, setInfo] = React.useState({});
  /*let info = {
    apellido: "Perez",
    nombre: "Juan",
    dni: "12345678",
    email: "juanperez@gmail.com",
    mascotas: [],
    genero: "Masculino",
    contraseña: "12345678",
  };*/

  React.useEffect(() => {
    window.addEventListener("resize", resize);

    if (dni !== "new") {
      fetch(`/api/pacientes/${dni}`)
        .then((response) => response.json())
        .then((data) => {
          setInfo(data.paciente);
        });
    }
  }, []);
  
  React.useEffect(() => {
    if (!props.isAdmin) {
      navigate("/");
    }
  }, [props.isAdmin]);

  const redirectMascotas = () => {
    navigate(`/admin/pacientes/${dni}/mascotas`);
  };

  const navigateSuccess = () => {
    navigate("/admin/pacientes");
  };
  
  const changeAvatar = (genero) => {
    setAvatarUrl(`https://avatars.dicebear.com/api/${genero}/1111.svg`);
  };

  if (dni !== "new") {
    //edicion
    return (
      <div className="row admin">
        <div className="col-xl-2 admin__nav">
          <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin}/>
        </div>
        <div className="col-xl-10 admin__panel">
          <NavegacionResponsive />
          <div className="admin__panel__pacientes-editarUser py-5 admin__panel__pacientes-content">
            <div className="admin__panel__pacientes-editarUser-form">
              <h1 className="mb-3 h3__bold">Editar paciente</h1>
              <FormularioEditarPaciente
                info={info}
                navigateSuccess={navigateSuccess}
                changeAvatar={changeAvatar}
              />
            </div>
            <div className="admin__panel__pacientes-editarUser-mascotas">
              <button
                type="button"
                onClick={redirectMascotas}
                className="admin__panel__pacientes-editarUser-btnMascotas"
              >
                <img src="/img/favicon.png" alt="" />
              </button>
              <p className="p__descripciones">Mascotas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row admin">
      <div className="col-xl-2 admin__nav">
        <Navegacion setIsAuthenticated={props.setIsAuthenticated} setIsAdmin={props.setIsAdmin}/>
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
          <h1 className="mb-3 h3__bold">Agregar paciente</h1>
          <FormularioRegistro avatar={avatarUrl} changeAvatar={changeAvatar} navigateSuccess={navigateSuccess} setIsAuthenticated={()=>{}} isAdmin={true}/>
        </div>
      </div>
    </div>
  );
};

export default CrudPacientes;
