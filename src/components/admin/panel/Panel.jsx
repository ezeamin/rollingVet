import React from 'react';
import CardAdmin from './card/CardAdmin';
import List from './list/List';
import './panel.css';

const Panel = () => {
    const info = [{
        titulo: 'Clientes',
        cantidad: '10',
    },
    {
        titulo: 'Médicos',
        cantidad: '2',
    },
    {
        titulo: 'Citas programadas',
        cantidad: '5',
    }];

    return (
        <div className='container py-5 admin__panel-content'>
            <h1 className='mb-3 h3__bold'>Panel de administracion</h1>
            <div className="row justify-content-center">
                {info.map((info, index) => (
                    <CardAdmin key={index} {...info} />
                ))}
            </div>
            <div className="row justify-content-center">
                <List titulo="Lista de clientes" content="clientes"/>
                <List titulo="Lista de citas" content="citas"/>
            </div>
        </div>
    );
};

export default Panel;