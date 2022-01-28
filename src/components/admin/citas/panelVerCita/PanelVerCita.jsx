import React from "react";
import { Form } from "react-bootstrap";
import "./panelVerCita.css";

class PanelVerCita extends React.Component {
  state = {
    veterinario: "0",
    comentarios: "",
    errorVet: false,
    VOD: false,
  };

  info = {
    //traer con codigo
    nombre: "Juan",
    apellido: "Perez",
    mascota: "Firulais",
    fecha: "12/12/2020",
    hora: "12:00",
    codigo: "aik98",
  };

  componentDidMount() {
    if (window.location.href.includes("VOD")) {
      //solo ver
      this.setState({ VOD: true });
      document.getElementsByClassName("admin__panel__cita-btnGuardar")[0].style.display = "none";
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

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validarVet()) return;

    //guardar en la base de datos
  };

  render() {
    return (
      <div className="admin__panel-content py-5 container">
        <h1 className="h3__bold admin__panel__cita-title">Cita</h1>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="admin__panel__cita-info row">
            <div className="col-sm-12 col-md-8">
              <h3 className="h3__bold mb-0 lh-100">
                {this.info.apellido},{" "}
                <span className="h3__bold-light">{this.info.nombre}</span>
              </h3>
              <p className="p__descripciones mb-5">
                Mascota: {this.info.mascota}
              </p>
              <p className="p__descripciones mb-0">Fecha: {this.info.fecha}</p>
              <p className="p__descripciones">Hora: {this.info.hora}</p>
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
                    return (
                      <option key={index} value={veterinario.codigo}>
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
            />
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
