import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./formularioContacto.css";
import Swal from "sweetalert2";
import { init, send } from "@emailjs/browser";
import cambiarColor from "../../../js/buttonColor";

class FormularioContacto extends Component {
  state = {
    nombre: "",
    email: "",
    mensaje: "",
    errores: {
      nombre: false,
      email: false,
      mensaje: false,
    },
    primaryDark: "", //para guardar el valor del color primario del documento
    enviando: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  verificar(name, value) {
    const errores = this.state.errores;

    if (value.trim() === "") {
      errores[name] = true;
      this.setState({
        errores: errores,
      });
      return true;
    } else {
      if (name === "email") {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errores[name] = true;
          this.setState({
            errores: errores,
          });
          return true;
        } else {
          errores[name] = false;
          this.setState({
            errores: errores,
          });
        }
      }
      errores[name] = false;
      this.setState({
        errores: errores,
      });
    }

    return false;
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.verificar(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let error = [false, false, false];
    let errorGeneral = false;

    error[0] = this.verificar("nombre", this.state.nombre);
    error[1] = this.verificar("email", this.state.email);
    error[2] = this.verificar("mensaje", this.state.mensaje);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      this.setState({ enviando: true });
      this.enviarMail();

      //deshabilitar boton - no cambia color
      const boton = document.getElementById("btnContacto");
      boton.disabled = true;
    }
  };

  enviarMail = async () => {
    init("user_qh54p4VeU3bqOcLlclhCJ");

    const templateParams = {
      from_name: this.state.nombre,
      from_mail: this.state.email,
      message: this.state.mensaje,
    };

    await send("service_wg30o5a", "template_j4xvixt", templateParams);
    Swal.fire({
      icon: "success",
      title: "¡Gracias!",
      text: "Su mensaje ha sido enviado correctamente y se lo contactará a la brevedad",
    });

    //habilitar boton
    this.setState({
      nombre: "",
      email: "",
      mensaje: "",
    });
    const boton = document.getElementById("btnContacto");
    boton.disabled = false;
    this.setState({ enviando: false });
  };

  componentDidMount() {
    //cambiar color a secundario
    this.primaryDark = cambiarColor(this.props.color);
  }

  componentWillUnmount() {
    //volver a color original
    if (this.props.color !== "primary") {
      let root = document.documentElement;
      root.style.setProperty("--global-color-primary-dark", this.primaryDark);
    }
  }
  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Nombre"
            name="nombre"
            className="input"
            isInvalid={this.state.errores.nombre}
            value={this.state.nombre}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese un nombre valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            placeholder="E-mail"
            name="email"
            className="input"
            isInvalid={this.state.errores.email}
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese un email valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            as="textarea"
            placeholder="Mensaje"
            name="mensaje"
            rows={3}
            className="input"
            isInvalid={this.state.errores.mensaje}
            value={this.state.mensaje}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
            style={{ resize: "none" }}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese un mensaje
          </Form.Control.Feedback>
        </Form.Group>
        <button id="btnContacto" type="submit" className="mt-2 w-100 btnForm">
          Enviar
        </button>
        {this.state.enviando ? (
          <div className="text-center mt-2">
            <p>Enviando...</p>
          </div>
        ) : null}
      </Form>
    );
  }
}

export default FormularioContacto;
