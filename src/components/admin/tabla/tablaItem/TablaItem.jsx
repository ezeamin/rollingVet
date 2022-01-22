import React from 'react';

const TablaItem = (props) => {
    //detect type
    let botones = [];
    switch (props.type) {
        case 'veterinarios':
            botones = [
                <button key={1} className="btn btn-outline-warning">Editar</button>,
                <button key={2} className="btn btn-outline-danger">Eliminar</button>,
            ];
            break;
        case 'pacientes':
            botones = [
                <button key={1} className="btn btn-outline-warning">Editar</button>,
                <button key={2} className="btn btn-outline-danger">Eliminar</button>,
            ];
            break;
        case 'citasProgramadas':
            botones = [
                <button key={1} className="btn btn-outline-success">Atender</button>,
                <button key={2} className="btn btn-outline-danger">Cancelar</button>,
            ];
            break;
        case 'citasRegistro':
            botones = [
                <button className="btn btn-outline-secondary">Revisar</button>,
            ];
            break;
        default:
            break;
    }

    
    return (
        <tr>
            {Object.keys(props.info).map((item, index) => {
                return <td key={index}>{props.info[item]}</td>;
            })}
            <td className='admin__tables-btn'>
            {botones.map((boton) => {
                return boton;
            })}
            </td>
        </tr>
    );
};

/*
<td>
    <button class="btn btn-outline-warning btn-tabla my-1">Editar</button>
    <button class="btn btn-outline-danger btn-tabla my-1">Eliminar</button>
</td>
*/

export default TablaItem;