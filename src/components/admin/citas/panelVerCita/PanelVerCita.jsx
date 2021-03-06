import React from "react";
import { Form } from "react-bootstrap";
import "./panelVerCita.css";
import Swal from "sweetalert2";
import Carga from "../../carga/Carga";
import convertir from "../../../../js/convertirFecha";
import Error from "../../error/Error";
import { init, send } from "@emailjs/browser";

class PanelVerCita extends React.Component {
  state = {
    veterinario: "0",
    comentarios: "",
    errorVet: false,
    errorComentarios: false,
    VOD: false,
    info: {},
    cargando: true,
    error: false,
    paciente: {},
  };

  mounted = true;

  componentDidMount() {
    this.mounted = true;

    fetch(
      process.env.REACT_APP_SERVER_URL + `/api/citas/${this.props.codigoCita}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res) => {
      if (res.ok && this.mounted) {
        res.json().then((data) => {
          if (this.mounted) {
            this.setState({ info: data.cita });
            if (window.location.href.includes("VOD")) {
              //lectura de cita
              this.setState({
                VOD: true,
                veterinario: this.state.info.veterinario,
                comentarios: this.state.info.comentarios,
              });
            } else {
              fetch(
                process.env.REACT_APP_SERVER_URL +
                  `/api/paciente/${this.state.info.dni}`,
                {
                  method: "GET",
                  credentials: "include",
                }
              ).then((res) => {
                if (res.ok) {
                  res.json().then((data) => {
                    if (this.mounted) {
                      this.setState({
                        paciente: data.paciente,
                      });
                    }
                  });
                }
              });
            }
            this.setState({ cargando: false });
          }
        });
      } else if (!res.ok) {
        this.setState({ cargando: false, error: true });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate() {
    if (!this.state.cargando && this.state.VOD) {
      document.getElementsByClassName(
        "admin__panel__cita-btnGuardar"
      )[0].style.display = "none";
    }
  }

  veterinarios = [
    {
      nombre: "Elsa",
      apellido: "Capunta",
      codigo: "aik98",
    },
    {
      nombre: "Esteban",
      apellido: "Dido",
      codigo: "aik99",
    },
  ];

  validarVet() {
    if (this.state.veterinario === "0") {
      this.setState({ errorVet: true });
      return false;
    } else this.setState({ errorVet: false });
    return true;
  }

  validarComentarios() {
    if (this.state.comentarios.trim() === "") {
      this.setState({ errorComentarios: true });
      return false;
    } else this.setState({ errorComentarios: false });
    return true;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validarVet()) return;
    if (!this.validarComentarios()) return;

    this.enviarMail();
    this.guardar();
  };

  async enviarMail() {
    init("user_qh54p4VeU3bqOcLlclhCJ");

    this.setState({
      nombre: "",
      email: "",
      mensaje: "",
    });

    const templateParams = {
      name: this.state.info.paciente.nombre,
      email: this.state.paciente.email,
      fecha: convertir(this.state.info.fecha),
      hora: this.state.info.hora,
      veterinario: this.state.veterinario,
      comentarios: this.state.comentarios,
      mascota: this.state.info.mascota,
    };

    await send("service_5hzt2bx", "template_vsucs9r", templateParams);
  }

  async guardar() {
    const data = {
      veterinario: this.state.veterinario,
      comentarios: this.state.comentarios.trim(),
      atendido: true,
    };

    const res = await fetch(
      process.env.REACT_APP_SERVER_URL + `/api/citas/${this.props.codigoCita}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      Swal.fire({
        title: "Cita guardada",
        icon: "success",
        text: " ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.props.navigateSuccess();
      });
    } else {
      alert("Error al guardar");
    }
  }

  render() {
    if (this.state.cargando) return <Carga />;
    else if (this.state.error) return <Error />;
    return (
      <div className="admin__panel-content py-5 container">
        <h1 className="h3__bold admin__panel__cita-title">Cita</h1>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="admin__panel__cita-info row">
            <div className="col-sm-12 col-md-8">
              <h3 className="h3__bold mb-0 lh-100">
                {this.state.info.paciente.apellido},{" "}
                <span className="h3__bold-light">
                  {this.state.info.paciente.nombre}
                </span>
              </h3>
              <p className="p__descripciones mb-5">
                Mascota: {this.state.info.mascota}
              </p>
              <p className="p__descripciones mb-0">
                Fecha: {convertir(this.state.info.fecha)}
              </p>
              <p className="p__descripciones">Hora: {this.state.info.hora}</p>
            </div>
            <div className="col-sm-12 col-md-4">
              <p className="p__descripciones mb-1">Veterinario: </p>
              <Form.Group>
                <Form.Select
                  as="select"
                  className="admin__panel__cita-select"
                  value={this.state.veterinario}
                  disabled={this.state.VOD}
                  onChange={(e) =>
                    this.setState({ veterinario: e.target.value })
                  }
                  onBlur={() => this.validarVet()}
                  isInvalid={this.state.errorVet}
                >
                  <option value="0">Seleccionar</option>
                  {this.veterinarios.map((veterinario, index) => {
                    const nombre = `${veterinario.apellido}, ${veterinario.nombre}`;
                    return (
                      <option key={index} value={nombre}>
                        {veterinario.apellido}, {veterinario.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Seleccione un veterinario
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              className="admin__panel__cita-comentarios"
              placeholder="Comentarios"
              value={this.state.comentarios}
              disabled={this.state.VOD}
              onChange={(e) => this.setState({ comentarios: e.target.value })}
              onBlur={() => this.validarComentarios()}
              isInvalid={this.state.errorComentarios}
            />
            <Form.Control.Feedback type="invalid">
              Cargue un comentario
            </Form.Control.Feedback>
          </Form.Group>
          <div className="admin__panel__cita-btnGuardar">
            <button type="submit">Guardar</button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PanelVerCita;
