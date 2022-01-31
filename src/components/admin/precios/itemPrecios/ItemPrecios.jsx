import React, { Component } from "react";
import { Form } from "react-bootstrap";
import "./itemPrecios.css";
import Swal from "sweetalert2";

class ItemPrecios extends Component {
  state = {
    actual: this.props.datos.precio,
    id: `precio_${this.props.datos.plan}`,
    precio: "",
    error: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  verificar(value) {
    if (isNaN(value) || value.trim() === "" || Number.parseFloat(value) < 0) {
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
    const precioTotal = Math.round(this.state.precio * 1.50);

    const response = await fetch(`/api/precios`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: this.props.datos.plan,
        precio: this.state.precio,
        precioTotal: precioTotal,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      this.setState({ actual: this.state.precio, precio: "" });
      Swal.fire({
        title: "Precio actualizado",
        text: " ",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.datos.precio !== prevProps.datos.precio) {
      this.setState({ actual: this.props.datos.precio });
    }
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
