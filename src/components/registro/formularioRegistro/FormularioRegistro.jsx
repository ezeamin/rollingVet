import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./formularioRegistro.css";
import Swal from "sweetalert2";
import { init, send } from "@emailjs/browser";
import changeEyePosition from "../../../js/changeEyePosition";
import validateString from "../../../js/validateString";

class FormularioRegistro extends Component {
  state = {
    nombre: "",
    apellido: "",
    dni: "",
    genero: "",
    email: "",
    contraseña: "",
    contraseña2: "",
    errores: {
      nombre: false,
      apellido: false,
      dni: false,
      genero: false,
      email: false,
      contraseña: false,
      contraseña2: false,
    },
    showPassword: false,
    cargando: true,
    isNew: true,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "genero")
      this.props.changeAvatar(e.target.value, false);
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
        case "nombre":
        case "apellido":
          if (!validateString(value) || value.length > 20 || value.length < 2) {
            return this.error(errores, name);
          }
          break;
        case "dni":
          if (!/^\d{7,8}$/i.test(this.state.dni) || this.state.dni<=0) {
            return this.error(errores, name);
          }
          break;
        case "email":
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return this.error(errores, name);
          }
          break;
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
        case "genero":
          if (value === "0") {
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

    if (this.state.isNew) {
      let error = [false, false, false, false, false, false, false];

      error[0] = this.verificar("nombre", this.state.nombre);
      error[1] = this.verificar("apellido", this.state.apellido);
      error[2] = this.verificar("dni", this.state.dni);
      error[3] = this.verificar("genero", this.state.genero);
      error[4] = this.verificar("email", this.state.email);
      error[5] = this.verificar("contraseña", this.state.contraseña);
      error[6] = this.verificar("contraseña2", this.state.contraseña2);

      error.forEach((element) => {
        if (element) {
          errorGeneral = true;
        }
      });
    } else {
      let error = [false, false, false, false, false];

      error[0] = this.verificar("nombre", this.state.nombre);
      error[1] = this.verificar("apellido", this.state.apellido);
      error[2] = this.verificar("dni", this.state.dni);
      error[3] = this.verificar("genero", this.state.genero);
      error[4] = this.verificar("email", this.state.email);

      error.forEach((element) => {
        if (element) {
          errorGeneral = true;
        }
      });
    }

    if (!errorGeneral) {
      const boton = document.getElementById("btnRegistro");
      boton.disabled = true;

      let estilo = window.getComputedStyle(document.body);
      let color = estilo.getPropertyValue("--global-color-primary-light");
      boton.style.backgroundColor = color;

      if (this.state.isNew) this.registrar(boton);
      else this.editar(boton);
    }
  };

  async login() {
    await fetch(process.env.REACT_APP_SERVER_URL + "/api/signin", {
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

    setTimeout(() => {}, 500);
    this.props.navigateSuccess();
  }

  capitalize(string) {
    //capitalize each word

    let words = string.split(" ");
    let newWords = [];

    words.forEach((word) => {
      newWords.push(word[0].toUpperCase() + word.slice(1));
    });

    return newWords.join(" ");
  }

  async registrar(boton) {
    let fecha = new Date();
    let fechaString =
      fecha.getFullYear() + "-" + fecha.getMonth() + "-" + fecha.getDate();

    const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: this.capitalize(this.state.nombre),
        apellido: this.capitalize(this.state.apellido),
        dni: this.state.dni,
        genero: this.state.genero,
        email: this.state.email,
        password: this.state.contraseña,
        avatar: this.props.avatar,
        mascotas: [],
        incorporacion: fechaString,
      }),
    });
    const data = await res.json();

    if (data.code === 200) {
      this.enviarMail();
      Swal.fire({
        title: "Registro exitoso",
        text: " ",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {
        if (!this.props.isAdmin) this.login();
        else this.props.navigateSuccess();
      });
    } else {
      Swal.fire({
        title: data.message,
        text: " ",
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

  enviarMail = async () => {
    init("user_fEGhekYTWvaVP2OtQtMlf");

    const templateParams = {
      name: this.state.nombre,
      apellido: this.state.apellido,
      email: this.state.email,
    };

    await send("service_iabhehr", "template_kp9acc2", templateParams);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.info !== this.props.info) {
      if (Object.keys(this.props.info).length !== 0) {
        this.setState({
          nombre: this.props.info.nombre,
          apellido: this.props.info.apellido,
          dni: this.props.info.dni,
          genero: this.props.info.genero,
          email: this.props.info.email,
        });
      }
    }
  }

  async editar(boton) {
    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + "/api/pacientes/editar",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: this.capitalize(this.state.nombre),
          apellido: this.capitalize(this.state.apellido),
          dni: this.state.dni,
          genero: this.state.genero,
          email: this.state.email,
          avatar: this.props.avatar,
          dniOriginal: this.props.info.dni,
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
        title: data.message,
        text: " ",
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

  mounted = true;

  componentDidMount() {
    this.mounted = true;

    if (!window.location.href.includes("new")) {
      if (
        window.location.href.includes("/user") ||
        window.location.href.includes("/admin")
      )
        this.setState({ isNew: false });
    }

    if (this.props.info) {
      this.setState({
        nombre: this.props.info.nombre,
        apellido: this.props.info.apellido,
        dni: this.props.info.dni,
        genero: this.props.info.genero,
        email: this.props.info.email,
        cargando: false,
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
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

  async cambiarContraseña() {
    if (window.location.href.includes("user"))
      this.props.navigatePass(`/user/perfil/password`);
    else
      this.props.navigatePass(
        `/admin/pacientes/${this.props.info.dni}/password`
      );
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="nombre-y-apellido">
          <Form.Group className="form__nombre">
            <Form.Control
              type="text"
              placeholder="Nombre"
              name="nombre"
              className="input"
              isInvalid={this.state.errores.nombre}
              value={this.state.nombre}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              maxLength="20"
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese un nombre valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 w-100">
            <Form.Control
              type="text"
              placeholder="Apellido"
              name="apellido"
              className="input"
              isInvalid={this.state.errores.apellido}
              value={this.state.apellido}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              maxLength="20"
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese un apellido valido
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        {/*<div className="nombre-y-apellido">*/}
        <div className="row">
          <div className="col-sm-12 col-md-4" id="dniInput">
            <Form.Group className="form__nombre w-100">
              <Form.Control
                type="number"
                placeholder="DNI"
                name="dni"
                className="input"
                isInvalid={this.state.errores.dni}
                value={this.state.dni}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.handleBlur(e)}
                maxLength="8"
              />
              <Form.Control.Feedback className="feedback" type="invalid">
                Ingrese un DNI valido (solo numeros)
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-4 col-sm-6 triInput" id="generoInput">
            <Form.Group className="mt-2 w-100">
              <Form.Select
                type="select"
                placeholder="Genero"
                name="genero"
                className="input"
                isInvalid={this.state.errores.genero}
                value={this.state.genero}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.handleBlur(e)}
              >
                <option value="0">Genero</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Select>
              <Form.Control.Feedback className="feedback" type="invalid">
                Seleccione su genero
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-md-4 col-sm-6 triInput" id="avatarInput">
            <button
              type="button"
              className="mt-2 w-100 btnForm btnFormAvatar"
              onClick={() => this.props.changeAvatar(this.state.genero, true)}
            >
              Cambiar <i className="fas fa-user-astronaut text-light ms-1"></i>
            </button>
          </div>
        </div>
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
        {this.state.isNew ? (
          <>
            <Form.Group className="mt-2 position-relative">
              <Form.Control
                type="password"
                placeholder="Contraseña"
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
                La contraseña debe tener al menos 6 caracteres, una mayuscula,
                una minuscula y un numero
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
          </>
        ) : null}
        <div className="d-flex">
          <button id="btnRegistro" type="submit" className="my-2 w-100 btnForm">
            Guardar
          </button>
          {!this.state.isNew ? (
            <button
              type="button"
              onClick={() => this.cambiarContraseña()}
              className="my-2 w-100 btnFormCambiarPass btn-success"
            >
              Cambiar contraseña
            </button>
          ) : null}
        </div>
      </Form>
    );
  }
}

export default FormularioRegistro;
