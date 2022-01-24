import React, { Component } from "react";
import { Form } from "react-bootstrap";
import './formularioCita.css';

class FormularioCita extends Component {
  state = {
    mascota: "0",
    fecha: "",
    hora: "",
    errores: {
      mascota: false,
      fecha: false,
      hora: false,
    },
    horarios: [],
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
      switch(name){
        case "hora":
        case "mascota":{
          if(value === "0") return this.error(errores, name);
          break;
        }
        case "fecha":{
          if(!/^\d{4}-\d{2}-\d{2}$/i.test(value)) return this.error(errores, name);
          
          let splitFecha = value.split("-");
          let fecha = new Date(splitFecha[0], splitFecha[1] - 1, splitFecha[2]);
          let fechaActual = new Date();

          if(fechaActual.getTime() > fecha.getTime()){
            return this.error(errores, name);
          }
          break;
        }
        default:{
          break;
        }
      }
    }

    return this.success(errores, name);
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    this.verificar(name, value);

    if(name==="fecha" && !this.state.errores.fecha){
      //actualizar horarios
      this.setState({horarios: ["10:00"]});
      
      this.props.setHorarios(this.state.horarios); 
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let error = [false, false, false];
    let errorGeneral = false;

    error[0] = this.verificar("mascota", this.state.mascota);
    error[1] = this.verificar("fecha", this.state.fecha);
    error[2] = this.verificar("hora", this.state.hora);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      //registrar
    }
  };

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="text-start">
        <Form.Group className="mt-5 nuevaCita-input">
          <Form.Select
            type="select"
            placeholder="Mascota"
            name="mascota"
            className="input"
            disabled={!this.props.desbloquear}
            isInvalid={this.state.errores.mascota}
            value={this.state.mascota}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          >
            <option value="0">Mascota</option>
            {this.props.paciente.mascotas.map((mascota,index) => (
              <option key={index} value={mascota.id}>
                {mascota.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback className="feedback" type="invalid">
            Seleccione una mascota
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2 nuevaCita-input">
          <Form.Control
            type="date"
            placeholder="Fecha"
            name="fecha"
            className="input"
            disabled={!this.props.desbloquear}
            isInvalid={this.state.errores.fecha}
            value={this.state.fecha}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          />
          <Form.Control.Feedback className="feedback" type="invalid">
            Ingrese una fecha valida
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-2 nuevaCita-input">
          <Form.Select
            type="select"
            placeholder="Hora"
            name="hora"
            className="input"
            disabled={!this.props.desbloquear}
            isInvalid={this.state.errores.hora}
            value={this.state.hora}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.handleBlur(e)}
          >
          <option value="0">Hora</option>
            {this.state.horarios.map((horario,index) => (
              <option key={index} value={horario}>
                {horario}
              </option>
            ))}
            </Form.Select>
          <Form.Control.Feedback className="feedback" type="invalid">
            Seleccione un horario
          </Form.Control.Feedback>
        </Form.Group>
        <button id="btnRegistro" type="submit" disabled={!this.props.desbloquear} className="my-2 w-100 btnForm">
          Cargar
        </button>
      </Form>
    );
  }
}

export default FormularioCita;
