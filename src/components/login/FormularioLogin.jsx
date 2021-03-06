import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./formularioLogin.css";
import Swal from "sweetalert2";
import changeEyePosition from "../../js/changeEyePosition";
import { Link } from "react-router-dom";

class FormularioLogin extends Component {
  state = {
    email: "",
    contraseña: "",
    errores: {
      email: false,
      contraseña: false,
    },
    showPassword: false,
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
      if(name === "contraseña") changeEyePosition(false);
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
      changeEyePosition(true);
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
      text: "Por favor, ponte en contacto con nosotros mediante algun medio de contacto previsto en inicio",
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
    const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.contraseña,
      }),
    });

    //errores
    if (res.status !== 200) {
      if (res.status === 500) {
        Swal.fire({
          title: "Error de servidor",
          text: "Vuelve a intentarlo mas tarde",
          icon: "error",
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      } else if (res.status === 401) {
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
    } else {
      //datos correctos
      const res2 = await fetch(process.env.REACT_APP_SERVER_URL+"/api/isAdmin", {
        method: "GET",
        credentials: "include",
      });
      const data2 = await res2.json();

      this.props.navigateSuccess(data2.isAdmin);
    }
  }

  displayPassword() {
    if (!this.state.showPassword) {
      document.getElementById("contraseña").type = "text";
      document.getElementById("eye").className = "fas fa-eye";
    } else {
      document.getElementById("contraseña").type = "password";
      document.getElementById("eye").className = "fas fa-eye-slash";
    }

    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group className="mt-2">
          <Form.Control
            type="email"
            placeholder="E-mail"
            name="email"
            className="input"
            isInvalid={this.state.errores.email}
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
            maxLength="35"
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese un email valido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2 position-relative">
          <Form.Control
            type="password"
            placeholder="Contraseña"
            name="contraseña"
            id="contraseña"
            className="input"
            isInvalid={this.state.errores.contraseña}
            value={this.state.contraseña}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
            maxLength="20"
          />
        <button
            className="btnContraseña"
            id="eyeBtn"
            type="button"
            onClick={() => this.displayPassword()}
          >
            <i className="fas fa-eye-slash" id="eye"></i>
          </button>
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
        <p className="mt-5 textRegistro">¿No tienes cuenta? <Link to="/registro" className="text-dark">Registrate</Link></p>
      </Form>
    );
  }
}

export default FormularioLogin;
