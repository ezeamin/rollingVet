import React, { Component } from "react";
import { Form } from "react-bootstrap";
import cambiarColor from "../../../../js/buttonColor";
import './formularioLogin.css';

class FormularioLogin extends Component {
  state = {
    email: "",
    contraseña: "",
    errores: {
      email: false,
      contraseña: false,
    },
    primaryDark: "", //para guardar el valor del color primario del documento
  };

  componentDidMount() {
    this.primaryDark = cambiarColor(this.props.color);
  }

  componentWillUnmount() {
    //volver a color original
    if(this.props.color!=="primary"){
      let root = document.documentElement;
      root.style.setProperty("--global-color-primary-dark", this.primaryDark);
    }
  }
  
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

    error[0] = this.verificar("email", this.state.email);
    error[1] = this.verificar("contraseña", this.state.contraseña);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
    //   this.enviarMail();

      //deshabilitar boton
      const boton = document.getElementById("btnContacto");
      boton.disabled = true;
    }
  };

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
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
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            className="input"
            isInvalid={this.state.errores.contraseña}
            value={this.state.contraseña}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese una contraseña
          </Form.Control.Feedback>
        </Form.Group>
        <a href="#" className="login__olvidasteContraseña">
            <p>¿Olvidaste tu contraseña?</p></a>
        <button id="btnLogin" type="submit" className="mt-2 w-100 btnForm">
          Ingresar
        </button>
      </Form>
    );
  }
}

export default FormularioLogin;
