import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./formularioLogin.css";
import Swal from "sweetalert2";

class FormularioLogin extends Component {
  state = {
    email: "",
    contraseña: "",
    errores: {
      email: false,
      contraseña: false,
    },
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

  olvidasteContraseña = () => {
    Swal.fire({
      title: "¿Olvidaste tu contraseña?",
      text: "Por favor, ponte en contacto con nosotros por medio de nuestras redes sociales",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
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
      //deshabilitar boton
      const boton = document.getElementById("btnLogin");
      boton.disabled = true;

      let estilo = window.getComputedStyle(document.body);
      let color = estilo.getPropertyValue("--global-color-primary-light");
      boton.style.backgroundColor = color;

      this.login(boton);
    }
  };

  async login(boton) {
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.contraseña,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (data.code === 200) {
      const res = await fetch("/api/isAdmin", {
        method: "GET",
      }).then((res) => res.json());
      const isAdmin = await res.isAdmin;
      
      this.props.navigateSuccess(isAdmin);
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
    boton.disabled = false;

    let estilo = window.getComputedStyle(document.body);
    let color = estilo.getPropertyValue("--global-color-primary");
    boton.style.backgroundColor = color;
  }

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
        <button
          onClick={this.olvidasteContraseña}
          type="button"
          className="login__olvidasteContraseña"
        >
          <p>¿Olvidaste tu contraseña?</p>
        </button>
        <button id="btnLogin" type="submit" className="mt-2 w-100 btnForm">
          Ingresar
        </button>
      </Form>
    );
  }
}

export default FormularioLogin;
