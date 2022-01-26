import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import "./toastLogin.css";

const ToastLogin = () => {
  const [show, setShow] = React.useState(true);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/auth", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      setUser(data.user);
    };
    getData();
  }, []);

  return (
    <ToastContainer className="p-3 toastLogin" position="bottom-start">
      <Toast onClose={() => setShow(false)} show={show} delay={2000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Bienvenido!</strong>
          <div className="toastLogin__img">
            <img src="/img/favicon.png" alt="logo rolling vet" />
          </div>
        </Toast.Header>
        <Toast.Body>Hola {user.nombre}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastLogin;
