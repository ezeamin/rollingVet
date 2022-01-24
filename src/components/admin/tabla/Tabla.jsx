import React from "react";
import "./tabla.css";
import Table from "react-bootstrap/Table";
import TablaItem from "./tablaItem/TablaItem";

const Tabla = (props) => {
  if(props.info.length === 0){
    return (
      <div>
        <h1 className="mb-3 h3__bold">{props.titulo}</h1>
        <p>No hay datos registrados</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-3 h3__bold">{props.titulo}</h1>
      <Table responsive id={props.ID} className="admin__tables mb-0">
        <thead>
          <tr>
            {props.opciones.map((opcion, index) => {
              return <th key={index}>{opcion}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.info.map((item,index) => {
            return <TablaItem key={index} info={item} type={props.type}/>;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Tabla;
