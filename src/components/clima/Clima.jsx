import React from 'react';
import './clima.css';

const Clima = () => {
    return (
        <div className='mt-5'>
            <div className='clima__flex'>
                <div className='clima__flex-card'>
                    {/* Contenido del clima */}
                </div>
                <div className='clima__flex-texto'>
                    <h3 className='h3__bold'>¿Llovió y se embarró Firulais?</h3>
                    <p className='p__descripcion mb-0'>¡No te preocupes! Un baño gratuito a la semana está incluido en todos los planes<br/><br/>Psst! Revisa el clima para evitar más huellas llenas de amor en tu sofá</p>
                </div>
            </div>
        </div>
    );
};

export default Clima;