import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./itemPrecios.css";
import Swal from "sweetalert2";

class ItemPrecios extends Component {
  state = {
    actual: "",
    id: `precio_${this.props.datos.id}`,
    precio: "",
    error: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  verificar(value) {
    if (!/^[0-9]{1,6}$/i.test(value) || Number.parseFloat(value) === 0) {
      this.setState({ error: true });
      document.getElementById(this.state.id).className =
        "admin__precios-item-input admin__precios-item-input-invalid";
      return false;
    }

    this.setState({ error: false });
    document.getElementById(this.state.id).className =
      "admin__precios-item-input";
    return true;
  }

  handleBlur = (e) => {
    const value = e.target.value;
    this.verificar(value);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.verificar(this.state.precio)) {
      return;
    }

    this.savePrecio();
  };

  savePrecio = async () => {
    const precioTotal = Math.round(Number.parseInt(this.state.precio) * 1.5);

    const response = await fetch(
      process.env.REACT_APP_SERVER_URL + `/api/precios`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: this.props.datos.plan,
          precio: Number.parseInt(this.state.precio),
          precioTotal: precioTotal,
        }),
      }
    );

    const data = await response.json();

    if (data.ok) {
      this.setState({ 
        actual: Number.parseInt(this.state.precio), 
        precio: "", 
        error: false 
      });
      Swal.fire({
        title: "Precio actualizado",
        text: " ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } else{
      Swal.fire({
        title: "Error",
        text: data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  mounted = true;

  componentDidMount() {
    this.setState({ actual: this.props.datos.precio });
  }

  componentDidUpdate(prevProps, prevState) {
    this.mounted = true;

    if (this.props.datos.precio !== prevProps.datos.precio && this.mounted) {
      this.setState({ actual: this.props.datos.precio });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="col-md-12 col-lg-4">
        <div className="admin__precios-item">
          <div className="admin__precios-item-info">
            <h3 className="admin__precios-item__titulo">
              {this.props.datos.plan}
            </h3>
            <p className="admin__precios-item__descripcion mb-0">
              Actual: ${this.state.actual}
            </p>
          </div>
          <Form
            className="admin__precios-item-new"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <input
              type="number"
              placeholder="Nuevo precio"
              name="precio"
              id={this.state.id}
              className="admin__precios-item-input"
              value={this.state.precio}
              onChange={(e) => this.handleChange(e)}
              onBlur={(e) => this.handleBlur(e)}
              maxLength="6"
            />
            <button className="admin__precios-item-btn" type="submit">
              <i className="fas fa-save"></i>
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

export default ItemPrecios;
