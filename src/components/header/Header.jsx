import React from 'react';
import './header.css';

const Header = () => {

    window.addEventListener('scroll', function () {
        let header = document.querySelector('header');
        let links = document.getElementsByClassName('header__container__links')[0];
        let logo = document.getElementsByClassName('logo')[0];

        let windowPosition = window.scrollY > 25;

        header.classList.toggle('scrolling-active', windowPosition);
        links.classList.toggle('scrolling-active__links', windowPosition);
        logo.classList.toggle('scrolling-active__logo', windowPosition);
    })

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