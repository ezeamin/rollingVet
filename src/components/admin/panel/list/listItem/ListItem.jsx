import React from 'react';
import './listItem.css';

const ListItem = (props) => {
    if(props.content === "clientes") {
        return (
            <div className='py-2 row admin__list__item align-items-center'>
                <div className='col-4 admin__list__item-avatar'>
                    <img src={props.avatar} alt={props.nombre}/>
                </div>
                <div className='col-8 admin__list__item-info'>
                    <h4 className='mb-1'>{props.nombre}</h4>
                    <p className='my-0'>Mascotas: {props.mascotas}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className='py-2 row admin__list__item align-items-center'>
                <div className='col-4 admin__list__item-avatar'>
                    <img src={props.avatar} alt={props.nombre}/>
                </div>
                <div className='col-8 admin__list__item-info'>
                    <h4 className='mb-1'>Cita de {props.nombre}</h4>
                    <p className='my-0'>Fecha: {props.fecha} - Hora: {props.hora}</p>
                </div>
            </div>
        );
    }

};

export default ListItem;