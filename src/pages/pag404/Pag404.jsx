import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/header/Header";
import "./pag404.css";

const Pag404 = (props) => {
    return (
        <div>
            <Header isAuthenticated={props.isAuthenticated} setIsAuthenticated={props.setIsAuthenticated}/>
            <article className="pagina404">
                <h1 className='main__title main__title-404'>404</h1>
                <h2>Página no encontrada</h2>
                <div className='pag404__img'>
                    <img src='/img/pag404/broken-bone.png' alt='broken-bone' />
                </div>
            </article>
            <Link to="/" className='fab__inicio'>Volver a inicio</Link>
        </div>
    );
};

export default Pag404;