import React from 'react';
import ListaHorariosItem from './listaHorariosItem/ListaHorariosItem';

const ListaHorarios = (props) => {
    return (
        <ul>
            {props.horarios.map((horario, index) => {
                return <ListaHorariosItem horario={horario} key={index}/>
            })}
        </ul>
    );
};

export default ListaHorarios;