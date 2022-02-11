import React from 'react';
import './mensaje.css'

const Mensaje = (props) => {
    return (
        <div className='mensaje'>
            {props.mensaje}
        </div>
    );
};

export default Mensaje;