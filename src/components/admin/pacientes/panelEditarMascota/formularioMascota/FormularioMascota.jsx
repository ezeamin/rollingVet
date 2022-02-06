import React, { Component } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import Carga from "../../../carga/Carga";

class FormularioMascota extends Component {
  state = {
    nombre: "",
    especie: "",
    raza: "",
    fechaNac: "",
    sexo: "",
    plan: "",
    errores: {
      nombre: false,
      especie: false,
      raza: false,
      fechaNac: false,
      sexo: false,
      plan: false,
    },
    cargando: true,
    titulo: this.props.titulo,
    isUser: window.location.href.includes("user"),
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
          if (!/^\d{4}-\d{2}-\d{2}$/i.test(value))
            return this.error(errores, name);

          let splitFecha = value.split("-");
          let fecha = new Date(splitFecha[0], splitFecha[1] - 1, splitFecha[2]);
          let fechaActual = new Date();

          if (fechaActual.getTime() < fecha.getTime()) {
            return this.error(errores, name);
          }
          break;
        case "plan":
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

    let error;
    if(!this.state.isUser) error = [false, false, false, false, false, false];
    else error = [false, false, false, false, false];

    let errorGeneral = false;

    error[0] = this.verificar("nombre", this.state.nombre);
    error[1] = this.verificar("especie", this.state.especie);
    error[2] = this.verificar("raza", this.state.raza);
    error[3] = this.verificar("fechaNac", this.state.fechaNac);
    error[4] = this.verificar("sexo", this.state.sexo);
    if(!this.state.isUser) error[5] = this.verificar("plan", this.state.plan);

    error.forEach((element) => {
      if (element) {
        errorGeneral = true;
      }
    });

    if (!errorGeneral) {
      //guardar
      this.guardarMascota();
    }
  };

  guardarMascota = async () => {
    const response = await fetch(`/api/pacientes/mascota/${this.props.dni}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: this.state.nombre,
        especie: this.state.especie,
        raza: this.state.raza,
        fechaNac: this.state.fechaNac,
        sexo: this.state.sexo,
        codigoMascota: this.props.codigoMascota, //cambiar si no es nuevo
        plan: this.state.plan,
      }),
    });
    const data = await response.json();

    if (data.code === 200) {
      Swal.fire({
        title: "Mascota guardada",
        text: " ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.props.navigateSuccess();
      });
    } else {
      Swal.fire({
        title: "Error",
        text: " ",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  mounted=true;

  componentDidUpdate(prevProps, prevState) {
    this.mounted = true;

    if (prevProps.info !== this.props.info && this.mounted) {
      if (Object.keys(this.props.info).length !== 0 && this.mounted) {
        this.setState({
          nombre: this.props.info.nombre,
          especie: this.props.info.especie,
          raza: this.props.info.raza,
          fechaNac: this.props.info.fechaNac,
          sexo: this.props.info.sexo,
          plan: this.props.info.plan,
        });
        this.setState({ cargando: false });
      }
    }
    if (prevProps.titulo !== this.props.titulo && this.mounted) {
      this.setState({ titulo: this.props.titulo });
      if (this.props.new) {
        this.setState({ cargando: false });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.cargando) return <Carga />;
    return (
      <>
        <h1 className="h3__bold">{this.state.titulo}</h1>
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
              <Form.Select
                type="select"
                placeholder="Especie"
                name="especie"
                className="input"
                isInvalid={this.state.errores.especie}
                value={this.state.especie}
                onChange={(e) => this.handleChange(e)}
                onBlur={(e) => this.handleBlur(e)}
              >
                <option value="0">Especie</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Hamster">Hamster</option>
                <option value="Carpincho">Carpincho</option>
              </Form.Select>
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
            <div className="text-center">
              <label>Fecha de nacimiento</label>
            </div>
            <Form.Control
              type="date"
              placeholder="Fecha de nacimiento"
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
          {!this.state.isUser ? 
          <Form.Group className="mt-2 w-100">
            <Form.Select
              type="select"
              placeholder="Plan"
              name="plan"
              className="input"
              isInvalid={this.state.errores.plan}
              value={this.state.plan}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
            >
              <option value="0">Plan</option>
              <option value="Sin plan">Sin plan</option>
              <option value="Primeros pasos">Primeros pasos</option>
              <option value="Madurando">Madurando</option>
              <option value="Adultos">Adultos</option>
            </Form.Select>
            <Form.Control.Feedback className="feedback" type="invalid">
              Seleccione un plan
            </Form.Control.Feedback>
          </Form.Group>
           : null}
          <button id="btnRegistro" type="submit" className="my-2 w-100 btnForm">
            Guardar
          </button>
        </Form>
      </>
    );
  }
}

export default FormularioMascota;
