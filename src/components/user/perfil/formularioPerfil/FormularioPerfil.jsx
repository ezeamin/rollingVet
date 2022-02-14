import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Carga from "../../../admin/carga/Carga";

class FormularioPerfil extends Component {
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
    cargando: true,
    showPassword: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "genero") this.props.changeAvatar(e.target.value);
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
      return this.error(errores, name);
    } else {
      switch (name) {
        case "nombre":
        case "apellido":
          if (value.length < 2) {
            return this.error(errores, name);
          }
          break;
        case "dni":
          if (!/^\d{7,8}$/i.test(this.state.dni)) {
            return this.error(errores, name);
          }
          break;
        case "email":
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return this.error(errores, name);
          }
          break;
        case "plan":
        case "genero":
          if (value === "0") {
            return this.error(errores, name);
          }
          break;
        case "contraseña":
          if (
            value.length < 6 ||
            value.length > 20 ||
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(value)
          ) {
            return this.error(errores, name);
          }
          break;
        case "contraseña2":
          if (this.state.contraseña !== this.state.contraseña2) {
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

    let error = [false, false, false, false, false, false, false];
    let errorGeneral = false;

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
    const res = await fetch("/api/user/editar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        apellido: this.state.apellido,
        dni: this.state.dni,
        genero: this.state.genero,
        email: this.state.email,
        avatar: this.props.avatar,
        contraseña: this.state.contraseña,
      }),
    });
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

  mounted = true;

  componentDidMount() {
    this.mounted = true;

    this.setState({
      nombre: this.props.info.nombre,
      apellido: this.props.info.apellido,
      dni: this.props.info.dni,
      genero: this.props.info.genero,
      email: this.props.info.email,
      cargando: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.info !== this.props.info && this.mounted) {
      if (Object.keys(this.props.info).length !== 0 && this.mounted) {
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
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  displayPassword() {
    if (!this.state.showPassword) {
      document.getElementById("contraseña").type = "text";
      document.getElementById("eye").className = "fas fa-eye-slash";
    } else {
      document.getElementById("contraseña").type = "password";
      document.getElementById("eye").className = "fas fa-eye";
    }

    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    if (this.state.cargando) return <Carga />;
    return (
      <>
        <h1 className="mb-3 h3__bold">{this.props.titulo}</h1>
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
                Ingrese un nombre
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
                Ingrese un apellido
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="nombre-y-apellido">
            <Form.Group className="form__nombre">
              <Form.Control
                type="text"
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
                Ingrese un DNI valido
              </Form.Control.Feedback>
            </Form.Group>
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
              maxLength="35"
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese un email valido
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative">
            <button
              className="btnContraseña"
              type="button"
              onClick={() => this.displayPassword()}
            >
              <i className="fas fa-eye" id="eye"></i>
            </button>
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
      </>
    );
  }
}

export default FormularioPerfil;
