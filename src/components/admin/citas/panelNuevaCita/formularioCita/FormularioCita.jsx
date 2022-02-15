import React, { Component } from "react";
import { Form } from "react-bootstrap";
import './formularioCita.css';
import Swal from "sweetalert2";
import { init,send } from '@emailjs/browser';
import convertir from "../../../../../js/convertirFecha";

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
    precio: 0,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if(e.target.name==="fecha"){
      if(this.verificarFecha(e.target.value)) this.props.setFecha(e.target.value);
      else this.props.setFecha(null);
    }
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

  verificarFecha(value){
    if(!/^\d{4}-\d{2}-\d{2}$/i.test(value)) return false;
          
    let splitFecha = value.split("-");
    let fecha = new Date(splitFecha[0], splitFecha[1] - 1, splitFecha[2]);
    let fechaActual = new Date();

    //mismo dia
    if(fecha.getDate()===fechaActual.getDate() && fecha.getMonth()===fechaActual.getMonth() && fecha.getFullYear()===fechaActual.getFullYear()){
      if(fechaActual.getHours()>=17){
        return false;
      }
    }

    if(fechaActual.getTime() > fecha.getTime()){
      return false;
    }

    //detectar fin de semana
    if(fecha.getDay() === 6 || fecha.getDay() === 0){
      return false;
    }

    return true;
  }

  verificar(name, value) {
    const errores = this.state.errores;

    if (value.trim() === "") {
      return this.error(errores, name);
    } else {
      switch(name){
        case "hora":
        case "mascota":{
          if(value === "0") return this.error(errores, name);

          const planMascota = this.props.paciente.mascotas.find(
            (mascota) => mascota.nombre === this.state.mascota
          ).plan;

          if(planMascota==="Sin plan") this.setState({precio: 1000});
          else this.setState({precio: 0});

          //cambiar precios si se hacen mas de 5 citas al mes

          break;
        }
        case "fecha":{
          if(!this.verificarFecha(value)) return this.error(errores, name);
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

  mandarMail = async () => {
    init("user_qh54p4VeU3bqOcLlclhCJ");

    const templateParams = {
      name: this.props.paciente.nombre,
      apellido: this.props.paciente.apellido,
      email: this.props.paciente.email,
      mascota: this.state.mascota,
      fecha: convertir(this.state.fecha),
      hora: this.state.hora,
    };

    await send("service_5hzt2bx", "template_u768qhi", templateParams);
  }

  registrarCita = async () => {
    const codigoMascota = this.props.paciente.mascotas.find(
      (mascota) => mascota.nombre === this.state.mascota
    ).codigoMascota;

    const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/citas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paciente: {
          dni: this.props.paciente.dni,
          nombre: this.props.paciente.nombre,
          apellido: this.props.paciente.apellido,
          avatar: this.props.paciente.avatar,
        },
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
      await fetch(process.env.REACT_APP_SERVER_URL+`/api/fechas`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fecha: this.state.fecha,
          hora: this.state.hora,
        })
      });

      this.mandarMail();

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

  mounted = true;

  componentDidUpdate(prevProps, prevState) {
    this.mounted = true;

    if(this.props.horarios !== this.state.horarios && this.mounted){
      this.setState({
        horarios: this.props.horarios,
      })
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="text-start">
        <Form.Group className="mt-2 nuevaCita-input">
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
              <option key={index} value={mascota.nombre}>
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
        <div className="text-center">
          <p>Valor de la cita: <b>${this.state.precio}</b></p>
        </div>
      </Form>
    );
  }
}

export default FormularioCita;
