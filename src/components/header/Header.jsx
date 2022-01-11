import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header>
            <div className='header__container'>
                <h2 className='logo'>RollingVet</h2>
                <div className='header__container__links'>
                    <a href='#' className='header__container__links-links'>Login</a>
                    <a href='#' className='header__container__links-links'>Planes</a>
                    <a href='#' className='header__container__links-links'>Registro</a>
                </div>
            </div>
        </header>
    );
};

export default Header;