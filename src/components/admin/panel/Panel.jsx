import React from 'react';
import CardAdmin from './card/CardAdmin';
import List from './list/List';
import './panel.css';

const Panel = () => {
    const [pacientes, setPacientes] = React.useState(0);
    const [citas, setCitas] = React.useState(0);

    const info = [{
        titulo: 'Pacientes',
        cantidad: pacientes,
    },
    {
        titulo: 'Veterinarios',
        cantidad: '2',
    },
    {
        titulo: 'Citas programadas',
        cantidad: citas,
    }];

    React.useEffect(() => {
        const traerInfo = async () => {
            const response = await fetch('/api/qty',{
                method: 'GET',
            });
            const info = await response.json();
            setPacientes(info.pacientes);
            setCitas(info.citas);
        }
        traerInfo();
    }, []);

    return (
        <div className='container py-5 admin__panel-content'>
            <h1 className='mb-3 h3__bold'>Panel de administracion</h1>
            <div className="row justify-content-center">
                {info.map((info, index) => (
                    <CardAdmin key={index} {...info} />
                ))}
            </div>
            <div className="row justify-content-center">
                <List titulo="Lista de pacientes" content="pacientes"/>
                <List titulo="Lista de citas" content="citas"/>
            </div>
        </div>
    );
};

export default Panel;