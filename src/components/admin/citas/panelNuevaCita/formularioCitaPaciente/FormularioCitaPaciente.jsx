import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

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

    this.buscarPaciente();
  };

  buscarPaciente = async () => {
    const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/paciente/${this.state.dni}`,{
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (data.paciente === null) {
      Swal.fire({
        title: "Paciente no encontrado",
        text: "El paciente no se encuentra registrado en el sistema",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
        showCloseButton: false,
      });
      this.props.setDesbloquear(false);
      this.props.setPaciente({
        nombre: "",
        apellido: "",
        mascotas:[{
          nombre: "",
          raza: "",
          fechaNac: "",
          sexo: "",
        }]
      });
      return;
    }

    this.props.setPaciente(data.paciente);
    this.props.setDesbloquear(true);
  }

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
              maxLength="8"
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
