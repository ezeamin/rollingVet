import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "./formularioContacto.css";
import Swal from "sweetalert2";
import { init,send } from '@emailjs/browser';

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
      this.enviarMail();

      //deshabilitar boton
      const boton = document.getElementById("btnContacto");
      boton.disabled = true;
    }
  };

  enviarMail = async () => {
    init("user_8j9LHOR1moc4XSGy8uETC");

    const templateParams = {
      from_name: this.state.nombre,
      from_mail: this.state.email,
      message: this.state.mensaje,
    };

    send("service_mvm479c", "template_q3a26mw", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        Swal.fire({
          icon: "success",
          title: "¡Gracias!",
          text: "Su mensaje ha sido enviado correctamente y se lo contactará a la brevedad",
        });

        //habilitar boton
        const boton = document.getElementById("btnContacto");
        boton.disabled = false;
      },
      function (error) {
        console.log("FAILED...", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al enviar su mensaje, por favor intente nuevamente",
        });
      }
    );
  };

  componentDidMount() {
    if(this.props.color!=="primary"){
      //cambiar color a secundario
      let estilo = window.getComputedStyle(document.body);
      let secondary = estilo.getPropertyValue("--global-color-secondary");
      let secondaryDark = estilo.getPropertyValue("--global-color-secondary-dark");
      this.primaryDark = estilo.getPropertyValue("--global-color-primary-dark");
      const boton = document.getElementById("btnContacto");
      boton.style.backgroundColor = secondary;

      let root = document.documentElement;
      root.style.setProperty("--global-color-primary-dark", secondaryDark);
    }
  }

  componentWillUnmount() {
    //volver a color original
    if(this.props.color!=="primary"){
      let root = document.documentElement;
      console.log(this.primaryDark);
      root.style.setProperty("--global-color-primary-dark", this.primaryDark);
    }
  }
  render() {
    return (
      <Form onSubmit={(e)=>this.handleSubmit(e)}>
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
        <Button id="btnContacto" type="submit" className="mt-2 w-100">
          Enviar
        </Button>
      </Form>
    );
  }
}

export default FormularioContacto;
