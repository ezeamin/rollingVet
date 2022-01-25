import React from "react";
import Navegacion from "../../../../components/admin/navegacion/Navegacion";
import NavegacionResponsive from "../../../../components/admin/navegacion/navegacionResponsive/NavegacionResponsive";
import resize from "../../../../js/adminResize";
import FormularioRegistro from "../../../../components/registro/formularioRegistro/FormularioRegistro";
import "./crudPacientes.css";
import { useNavigate } from "react-router-dom";

const CrudPacientes = () => {
  const navigate = useNavigate();
  const url = window.location.href;
  const urlSplit = url.split("/");
  const codigo = urlSplit[urlSplit.length - 1];

  let info = {
    apellido: "Perez",
    nombre: "Juan",
    dni: "12345678",
    email: "juanperez@gmail.com",
    mascotas: [],
    genero: "Masculino",
    contraseña: "12345678",
  }

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    //CARGAR INFO
    if (codigo !== "new") {
      
    }
  }, []);

  const redirectMascotas = () => {
    navigate(`/admin/pacientes/${codigo}/mascotas`);
  };

  const navigateSuccess = () => {
    //manejar ruta de exito
  }

  if (codigo !== "new") {
    //edicion
    return (
      <div className="row admin">
        <div className="col-xl-2 admin__nav">
          <Navegacion />
        </div>
        <div className="col-xl-10 admin__panel">
          <NavegacionResponsive />
          <div className="admin__panel__pacientes-editarUser py-5 admin__panel__pacientes-content">
            <div className="admin__panel__pacientes-editarUser-form">
              <h1 className="mb-3 h3__bold">Editar paciente</h1>
              <FormularioRegistro info={info} navigateSuccess={navigateSuccess} />
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
        <Navegacion />
      </div>
      <div className="col-xl-10 admin__panel">
        <NavegacionResponsive />
        <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
          <h1 className="mb-3 h3__bold">Agregar paciente</h1>
          <FormularioRegistro/>
        </div>
      </div>
    </div>
  );
};

export default CrudPacientes;
