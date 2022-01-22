import React from "react";
import "./list.css";
import ListItem from "./listItem/ListItem";

const List = (props) => {
  let datos = [{
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
    nombre: "Juan Perez",
    mascotas: "2",
  }];

  if (props.content === "clientes") {
    //clientes
    // avatar, nombre, mascotas 
  } else {
    //citas
    // avatar, nombre, fecha, hora
  }

  return (
    <div className="col-md-12 col-lg-6">
      <div className="admin__card admin__list">
        <div className="admin__list-titulo">
          <h3 className="mb-0 p-3">{props.titulo}</h3>
        </div>
        {datos.map((datos, index) => {
          return <ListItem key={index} {...datos} content={props.content} />;
        })}
      </div>
    </div>
  );
};

export default List;
