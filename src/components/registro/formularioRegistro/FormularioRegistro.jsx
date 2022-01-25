import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./formularioRegistro.css";

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
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if(e.target.name === "genero") this.props.changeAvatar(e.target.value);
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

    let error = [false, false, false, false, false, false];
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

      //registrar
      //mandar mail
    }
  };

  componentDidMount() {
    if(this.props.info === undefined) return;
    if(Object.keys(this.props.info).length !== 0) {
      this.setState({
        nombre: this.props.info.nombre,
        apellido: this.props.info.apellido,
        dni: this.props.info.dni,
        genero: this.props.info.genero,
        email: this.props.info.email,
        contraseña: this.props.info.contraseña,
        contraseña2: this.props.info.contraseña,
      });
    }
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

export default FormularioRegistro;
