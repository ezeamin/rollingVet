import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Login from './login/Login';

const Header = () => {
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <header>
                <div className='header__container'>
                    <Link to='/' style={{textDecoration:"none"}}><h2 className='logo'>RollingVet</h2></Link>
                    <div className='header__container__links'>
                        <button onClick={handleShow} className='header__container__links-links header__button'>Login</button>
                        <Link to='/planes' className='header__container__links-links'>Planes</Link>
                        <Link to='/registro' className='header__container__links-links'>Registro</Link>
                    </div>
                </div>
                <Login show={show} handleClose={handleClose} />
            </header>
        </>
    );
};

export default Header;