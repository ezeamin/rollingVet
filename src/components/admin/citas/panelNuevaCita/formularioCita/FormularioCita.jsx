import React, { Component } from "react";
import { Form } from "react-bootstrap";
import './formularioCita.css';
import Swal from "sweetalert2";

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
    horarios: this.props.horarios,
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

          //detectar fin de semana
          if(fecha.getDay() === 6 || fecha.getDay() === 0){
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
      this.props.setFecha(value);
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
      this.registrarCita();
    }
  };

  registrarCita = async () => {
    const codigoMascota = this.props.paciente.mascotas.find(
      (mascota) => mascota.nombre === this.state.mascota
    ).codigoMascota;

    const response = await fetch(`/api/citas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dni: this.props.paciente.dni,
        nombre: this.props.paciente.nombre,
        apellido: this.props.paciente.apellido,
        mascota: this.state.mascota,
        codigoMascota: codigoMascota,
        fecha: this.state.fecha,
        hora: this.state.hora,
        atendido: false,
        veterinario: "-",
        comentarios: "",
        codigoCita: "",
      }),
    });
    const data = await response.json();

    if (data.ok) {
      const res= await fetch(`/api/fechas`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: this.state.fecha,
          hora: this.state.hora,
        })
      });
      const data = await res.json();

      console.log(data);

      Swal.fire({
        title: "Cita registrada",
        text: "La cita se ha registrado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        showCloseButton: false,
      }).then(() => {
        this.props.navigateSuccess();
      });
    }
    else{
      Swal.fire({
        title: "Error",
        text: "No se ha podido registrar la cita",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
        showCloseButton: false,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.horarios !== this.state.horarios){
      this.setState({
        horarios: this.props.horarios,
      })
    }
  }

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
