import React from 'react';
import './info.css';

const Info = () => {
    return (
        <div className='text-center info'>
            <article>
                <h3 className='h3__bold'>¿Por que elegirnos?</h3>
                <ul className=''>
                    <li>Porque trabajamos con las mejores marcas</li>
                    <li>Porque contamos con profesionales de alta categoria</li>
                    <li>Porque amamos a tu mascota tanto como vos</li>
                </ul>
            </article>
            <article className='marcas'>
                <div className='marcas__container'>
                    <img src='img/index/marcas/eukanuba.png' alt='eukanuba' style={{width: "140px"}}/>
                </div>
                <div className='marcas__container'>
                    <img src='img/index/marcas/royal.png' alt='royal' />
                </div>
                <div className='marcas__container'>
                    <img src='img/index/marcas/pedigree.png' alt='pedigree' />
                </div>
                <div className='marcas__container'>
                    <img src='img/index/marcas/whiskas.png' alt='whiskas' />
                </div>
                <div className='marcas__container'>
                    <img src='img/index/marcas/purina.png' alt='purina' style={{width: "120px"}}/>
                </div>
            </article>
            <p className='p__mascotas mt-4'>¡Tenemos lo que necesites para el cuidado de tu mascota!</p>
        </div>
    );
};

export default Info;