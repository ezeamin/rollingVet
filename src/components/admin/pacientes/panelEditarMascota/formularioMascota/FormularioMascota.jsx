import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FormularioMascota extends Component {
  state = {
    //AGREGAR CODIGOMASCOTA
    nombre: "",
    especie: "",
    raza: "",
    fechaNac: "",
    sexo: "",
    errores: {
      nombre: false,
      especie: false,
      raza: false,
      fechaNac: false,
      sexo: false,
    },
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
      return this.error(errores, name);
    } else {
      switch (name) {
        case "nombre":
        case "especie":
        case "raza":
          if (value.length < 2) {
            return this.error(errores, name);
          }
          break;
        case "fechaNac":
            if(!/^\d{4}-\d{2}-\d{2}$/i.test(value)) return this.error(errores, name);
          
            let splitFecha = value.split("-");
            let fecha = new Date(splitFecha[0], splitFecha[1] - 1, splitFecha[2]);
            let fechaActual = new Date();
  
            if(fechaActual.getTime() < fecha.getTime()){
              return this.error(errores, name);
            }
            break;
        case "sexo":
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

    let error = [false, false, false, false, false];
    let errorGeneral = false;

    error[0] = this.verificar("nombre", this.state.nombre);
    error[1] = this.verificar("especie", this.state.especie);
    error[2] = this.verificar("raza", this.state.raza);
    error[3] = this.verificar("fechaNac", this.state.fechaNac);
    error[4] = this.verificar("sexo", this.state.sexo);
    

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      //guardar
    }
  };

  componentDidMount() {
    if (this.props.info === undefined) return;
    if (Object.keys(this.props.info).length !== 0) {
      this.setState({
        nombre: this.props.info.nombre,
        especie: this.props.info.especie,
        raza: this.props.info.raza,
        fechaNac: this.props.info.fechaNac,
        sexo: this.props.info.sexo,
      });
    }
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="text-start">
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
              placeholder="Especie"
              name="especie"
              className="input"
              isInvalid={this.state.errores.especie}
              value={this.state.especie}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese una especie
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="nombre-y-apellido">
          <Form.Group className="form__nombre">
            <Form.Control
              type="text"
              placeholder="Raza"
              name="raza"
              className="input"
              isInvalid={this.state.errores.raza}
              value={this.state.raza}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese una raza
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 w-100">
            <Form.Select
              type="select"
              placeholder="Sexo"
              name="sexo"
              className="input"
              isInvalid={this.state.errores.sexo}
              value={this.state.sexo}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            >
              <option value="0">Sexo</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </Form.Select>
            <Form.Control.Feedback className="feedback" type="invalid">
              Seleccione el sexo
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group className="mt-2 nuevaCita-input">
          <Form.Control
            type="date"
            placeholder="E-mail"
            name="fechaNac"
            className="input"
            isInvalid={this.state.errores.fechaNac}
            value={this.state.fechaNac}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese una fecha valida
          </Form.Control.Feedback>
        </Form.Group>
        <button id="btnRegistro" type="submit" className="my-2 w-100 btnForm">
          Guardar
        </button>
      </Form>
    );
  }
}

export default FormularioMascota;
