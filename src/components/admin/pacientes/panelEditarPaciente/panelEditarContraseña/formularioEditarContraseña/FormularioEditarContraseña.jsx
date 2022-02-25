import React, { Component } from "react";
import { Form } from "react-bootstrap";
import changeEyePosition from "../../../../../../js/changeEyePosition";
import Swal from "sweetalert2";

class FormularioEditarContraseña extends Component {
  state = {
    contraseña: "",
    contraseña2: "",
    errores: {
      contraseña: false,
      contraseña2: false,
    },
    showPassword: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  error = (errores, name) => {
    errores[name] = true;
    this.setState({
      errores: errores,
    });
    return true;
  };

  success = (errores, name) => {
    errores[name] = false;
    this.setState({
      errores: errores,
    });
    return false;
  };

  verificar(name, value) {
    const errores = this.state.errores;

    if (value.trim() === "") {
      if (name === "contraseña") changeEyePosition(false);
      return this.error(errores, name);
    } else {
      switch (name) {
        case "contraseña":
          if (
            value.length < 6 ||
            value.length > 20 ||
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)
          ) {
            changeEyePosition(false);
            return this.error(errores, name);
          }
          changeEyePosition(true);
          break;
        case "contraseña2":
          if (this.state.contraseña !== value) {
            return this.error(errores, name);
          }
          break;
        default:
          break;
      }
    }

    return this.success(errores, name);
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.verificar(name, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let errorGeneral = false;
    let error = [false, false];

    error[0] = this.verificar("contraseña", this.state.contraseña);
    error[1] = this.verificar("contraseña2", this.state.contraseña2);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      const boton = document.getElementById("btnRegistro");
      boton.disabled = true;

      let estilo = window.getComputedStyle(document.body);
      let color = estilo.getPropertyValue("--global-color-primary-light");
      boton.style.backgroundColor = color;

      this.editar(boton);
    }
  };

  async editar(boton) {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/api/pacientes/editarPass",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni: this.props.dni,
          password: this.state.contraseña,
        }),
      }
    );
    const data = await res.json();

    if (data.ok) {
      Swal.fire({
        title: "Edicion exitosa",
        text: " ",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {
        this.props.navigateSuccess();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Vuelve a intentarlo mas tarde",
        icon: "error",
        timer: 2500,
        showCancelButton: false,
        showConfirmButton: false,
      });

      boton.disabled = false;

      let estilo = window.getComputedStyle(document.body);
      let color = estilo.getPropertyValue("--global-color-primary");
      boton.style.backgroundColor = color;
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
      <Form onSubmit={(e) => this.handleSubmit(e)} className="text-start">
        <Form.Group className="mt-2 position-relative">
          <Form.Control
            type="password"
            placeholder="Nueva contraseña"
            name="contraseña"
            className="input"
            id="contraseña"
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
            La contraseña debe tener al menos 6 caracteres, una mayuscula, una
            minuscula y un numero
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="password"
            placeholder="Repetir contraseña"
            name="contraseña2"
            className="input"
            isInvalid={this.state.errores.contraseña2}
            value={this.state.contraseña2}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
            maxLength="20"
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Las contraseñas no coinciden
          </Form.Control.Feedback>
        </Form.Group>
        <button id="btnRegistro" type="submit" className="my-2 w-100 btnForm">
          Guardar
        </button>
      </Form>
    );
  }
}

export default FormularioEditarContraseña;
