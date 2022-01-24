import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FormularioCitaPaciente extends Component {
  state = {
    dni: "",
    error: false,
  };

  verificar(value) {
    if (value.trim() === "" || !/^\d{7,8}$/i.test(value)){
        this.setState({error: true});
        return false;
    }
    this.setState({error: false});
    return true;
  }

  handleBlur = (e) => {
    const value = e.target.value;
    this.verificar(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.verificar(this.state.dni)) {
        //error
        return;
    }

    //guardar en la base de datos
    this.props.setDesbloquear(true);
    this.props.setPaciente({
      dni: this.state.dni,
      nombre: "Juan",
      apellido: "Perez",
      mascotas:[{
        nombre: "Firulais",
        raza: "Caniche",
        fechaNac: "12/12/2020",
        sexo: "Macho",
      }]
    })
  };

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="text-start">
          <Form.Group className="form__nombre">
            <Form.Control
              type="text"
              placeholder="DNI"
              name="dni"
              className="input"
              isInvalid={this.state.error}
              value={this.state.dni}
              onChange={(e) => this.setState({dni: e.target.value})}
              onBlur={(e) => this.handleBlur(e)}
            />
            <Form.Control.Feedback className="feedback" type="invalid">
              Ingrese un DNI valido
            </Form.Control.Feedback>
          </Form.Group>
        <button id="btnBuscarDNI" type="submit" className="my-2 w-100 btnForm">
          Buscar
        </button>
      </Form>
    );
  }
}

export default FormularioCitaPaciente;
