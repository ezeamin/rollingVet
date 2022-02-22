import React from 'react';
import { Link } from 'react-router-dom';
import HeaderRegistro from '../../components/registro/header/HeaderRegistro';
import "./pag404.css";
import { useNavigate } from 'react-router-dom';

const Pag404 = (props) => {
    const navigate = useNavigate();
    
    return (
        <div>
            <HeaderRegistro isAuthenticated={props.isAuthenticated} setIsAuthenticated={props.setIsAuthenticated}/>
            <article className="pagina404">
                <button className="btnVolver btnVolver-left" onClick={()=>navigate(-1)}><i className="fas fa-chevron-left"></i></button>
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