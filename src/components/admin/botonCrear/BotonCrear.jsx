import React from 'react';
import './botonCrear.css';

const BotonCrear = (props) => {
    return (
        <div className="admin__panel-btn w-100 mt-3">
          <button className="btn btn-outline-success" onClick={props.accion}>{props.titulo}</button>
        </div>
    );
};

export default BotonCrear;