import React from 'react';
import './cardAdmin.css';

const CardAdmin = (props) => {
    return (
        <div className='col-sm-12 col-md-6 col-lg-4'>
            <div className='admin__card'>
                <h3>{props.titulo}</h3>
                <h2>{props.cantidad}</h2>
            </div>
        </div>
    );
};

export default CardAdmin;