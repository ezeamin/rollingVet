import React from "react";
import { Modal } from "react-bootstrap";
import FormularioLogin from "./formularioLogin/FormularioLogin";
import './login.css'

const Login = (props) => {
  const [color, setColor] = React.useState("primary");

  React.useEffect(() => {
    //cambiar color del boton de login segun la pagina
    if(window.location.href.includes("/planes")) setColor("secondary");
  }, []);

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Body className="login__modal-body">
        <h3 className="login__title">Log in</h3>
        <p className="login__description">Ingrese sus datos</p>
        <FormularioLogin color={color} show={props.show} handleClose={props.handleClose}/>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
