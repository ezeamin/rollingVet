import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <header>
            <div className='header__container'>
                <Link to='/' style={{textDecoration:"none"}}><h2 className='logo'>RollingVet</h2></Link>
                <div className='header__container__links'>
                    <a href='#' className='header__container__links-links'>Login</a>
                    <Link to='/planes' className='header__container__links-links'>Planes</Link>
                    <a href='#' className='header__container__links-links'>Registro</a>
                </div>
            </div>
        </header>
    );
};

export default Header;