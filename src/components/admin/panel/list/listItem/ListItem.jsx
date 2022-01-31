import React from "react";
import "./listItem.css";
import Skeleton from "@mui/material/Skeleton";

const ListItem = (props) => {
  switch (props.content) {
    case "pacientes": {
      return (
        <div className="py-2 row admin__list__item align-items-center">
          <div className="col-4 admin__list__item-avatar d-flex justify-content-center">
            <img src={props.avatar} alt={props.nombre} />
          </div>
          <div className="col-8 admin__list__item-info">
            <h4 className="mb-1">{props.nombre}</h4>
            <p className="my-0">Mascotas: {props.mascotas}</p>
            <p className="my-0">Plan: {props.plan}</p>
          </div>
        </div>
      );
    }
    case "citas": {
      return (
        <div className="py-2 row admin__list__item align-items-center">
          <div className="col-4 admin__list__item-avatar">
            <img src={props.avatar} alt={props.nombre} />
          </div>
          <div className="col-8 admin__list__item-info">
            <h4 className="mb-1">Cita de {props.nombre}</h4>
            <p className="my-0">Fecha: {props.fecha}</p>
            <p className="my-0">Hora: {props.hora}</p>
          </div>
        </div>
      );
    }
    case "loading": {
      return (
        <div className="py-2 row admin__list__item align-items-center admin__list__item-loading">
          <div className="col-4 admin__list__item-avatar d-flex justify-content-center">
            <Skeleton variant="circular" width={80} height={80} />
          </div>
          <div className="col-8 admin__list__item-info">
            <Skeleton variant="text" width={"90%"} />
            <Skeleton variant="rectangular" height={40} width={"90%"} />
          </div>
        </div>
      );
    }
    default:
      return (
        <div className="py-2 align-items-center text-center w-100 mt-2">
          <p className="w-100">No hay datos</p>
        </div>
      );
  }
};

export default ListItem;
