import React from "react";
import "./navegacion.css";
import NavItem from "./navItem/Nav-item";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Navegacion = (props) => {
  const navigate = useNavigate();
  const [opciones, setOpciones] = React.useState([]);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    //dejo las constantes adentro porque "active" es una funcion
    const opcionesAdmin = [
      {
        titulo: "Resumen",
        icono: "fas fa-chart-line",
        enlace: "/admin",
        active: window.location.pathname === "/admin",
      },
      {
        titulo: "Citas",
        icono: "fas fa-calendar-alt",
        enlace: "/admin/citas",
        active: window.location.pathname.includes("/citas"),
      },
      {
        titulo: "Pacientes",
        icono: "fas fa-user-injured",
        enlace: "/admin/pacientes",
        active: window.location.pathname.includes("/pacientes"),
      },
      {
        titulo: "Veterinarios",
        icono: "fas fa-user-md",
        enlace: "/admin/veterinarios",
        active: window.location.pathname.includes("/veterinarios"),
      },
      {
        titulo: "Precios",
        icono: "fas fa-dollar-sign",
        enlace: "/admin/precios",
        active: window.location.pathname.includes("/precios"),
      },
      {
        titulo: "Salir",
        icono: "fas fa-sign-out-alt",
        enlace: "",
        active: false,
      },
    ];

    const opcionesUser = [
      {
        titulo: "Dashboard",
        icono: "fas fa-chart-line",
        enlace: "/user",
        active: window.location.pathname === "/user",
      },
      {
        titulo: "Mi perfil",
        icono: "fas fa-user",
        enlace: "/user/perfil",
        active: window.location.pathname.includes("/perfil"),
      },
      {
        titulo: "Citas",
        icono: "fas fa-calendar-alt",
        enlace: "/user/citas",
        active: window.location.pathname.includes("/citas"),
      },
      {
        titulo: "Salir",
        icono: "fas fa-sign-out-alt",
        enlace: "",
        active: false,
      },
    ];
    
    if (props.isAdmin) {
      setOpciones(opcionesAdmin);
      setUser({
        nombre: "Ezequiel",
        role: "admin",
        imagen: "/img/index/profesionales/ezequiel.png",
      });

      document.getElementById("imagenUserAdmin").style.borderRadius = "50%";
    } else if(props.user){
      setOpciones(opcionesUser);
      setUser({
        nombre: props.user.nombre,
        role: "usuario",
        imagen: props.user.avatar,
      });
    }

    document
      .getElementsByClassName("admin__nav-bg")[0]
      .addEventListener("click", () => {
        document.getElementsByClassName(
          "admin__nav-container"
        )[0].style.transform = "translateX(-100%)";
        setTimeout(() => {
          document.getElementsByClassName("admin__nav")[0].style.display =
            "none";
        }, 300);
      });
  }, [props.isAdmin, props.user]);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "DELETE",
    });

    Swal.fire({
      title: "¡Adios!",
      text: " ",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false,
    }).then(() => {
      /*props.setIsAuthenticated(false);
      sessionStorage.removeItem("isFirstTime");
      if(window.location.pathname !== "/")  navigate("/");
      else window.location.reload();*/

      props.setIsAuthenticated(false);
      props.setIsAdmin(false);
      navigate("/");
    });
  };

  return (
    <div>
      <div className="admin__nav-bg"></div>
      <div className="container admin__nav-container">
        <div className="admin__logo">
          <Link to="/admin">
            <img src="/img/favicon.png" alt="logo RollingVet" />
          </Link>
        </div>
        <div className="admin__user my-4">
          <div className="admin__user-foto">
            <img
              src={user.imagen}
              alt={user.nombre}
              id="imagenUserAdmin"
            />
          </div>
          <div className="admin__user-name">
            <h4>{user.nombre}</h4>
            <p>{user.role}</p>
          </div>
        </div>
        <div className="admin__menu">
          <h4 className="ms-3">Menu</h4>
          {opciones.map((opcion, index) => (
            <NavItem key={index} {...opcion} handleLogout={handleLogout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navegacion;
