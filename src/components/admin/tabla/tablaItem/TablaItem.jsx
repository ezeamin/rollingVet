import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './tablaItem.css';

const TablaItem = (props) => {
    const navigate = useNavigate();

    const editarPaciente = () => {
        navigate(`/admin/pacientes/${props.info.dni}`);
    }
    const eliminarPaciente = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonColor: '#6c757d',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed) console.log("Eliminado");
            else console.log("Cancelado");
        });
    }

    const atenderCita = () => {
        navigate(`/admin/citas/${props.info.codigo}`);
    }
    const cancelarCita = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Cancelar cita',
            cancelButtonColor: '#6c757d',
            cancelButtonText: 'Cerrar'
        }).then((result) => {
            if(result.isConfirmed) console.log("Eliminado");
            else console.log("Cancelado");
        });
    }

    const revisarCita = () => {
        navigate(`/admin/citas/${props.info.codigo}-VOD`); //view only data
    }

    const editarMascota = () => {
        const codigo = window.location.href.split("/")[window.location.href.split("/").length - 2];
        navigate(`/admin/pacientes/${codigo}/mascotas/${props.info.codigoMascota}`);
    }
    const eliminarMascota = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonColor: '#6c757d',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if(result.isConfirmed) console.log("Eliminado");
            else console.log("Cancelado");
        });
    }

    let botones = [];
    switch (props.type) {
        case 'veterinarios':
            botones = [
                <button key={Math.round(Math.random()*10000)} className="btn btn-outline-warning">Editar</button>,
                <button key={Math.round(Math.random()*10000)} className="btn btn-outline-danger">Eliminar</button>,
            ];
            break;
        case 'pacientes':
            botones = [
                <button onClick={editarPaciente} key={Math.round(Math.random()*10000)} className="btn btn-outline-warning">Editar</button>,
                <button onClick={eliminarPaciente} key={Math.round(Math.random()*10000)} className="btn btn-outline-danger">Eliminar</button>,
            ];
            break;
        case 'citasProgramadas':
            botones = [
                <button onClick={atenderCita} key={Math.round(Math.random()*10000)} className="btn btn-outline-success">Atender</button>,
                <button onClick={cancelarCita} key={Math.round(Math.random()*10000)} className="btn btn-outline-danger">Cancelar</button>,
            ];
            break;
        case 'citasRegistro':
            botones = [
                <button onClick={revisarCita} key={Math.round(Math.random()*10000)} className="btn btn-outline-secondary">Revisar</button>,
            ];
            break;
        case 'mascotas':
            botones = [
                <button onClick={editarMascota} key={Math.round(Math.random()*10000)} className="btn btn-outline-warning">Editar</button>,
                <button onClick={eliminarMascota} key={Math.round(Math.random()*10000)} className="btn btn-outline-danger">Eliminar</button>,
            ];
            break;
        default:
            break;
    }

    
    return (
        <tr>
            {Object.keys(props.info).map((item, index) => {
                if(item!=='codigo' && item!=='codigoMascota'){
                    return <td key={index}>{props.info[item]}</td>
                };
            })}
            <td className='admin__tables-btn'>
            {botones.map((boton) => {
                return boton;
            })}
            </td>
        </tr>
    );
};

export default TablaItem;