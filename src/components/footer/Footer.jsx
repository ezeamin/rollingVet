import React from 'react';
import './footer.css';
import FormularioContacto from './formularioContacto/FormularioContacto';

const Footer = () => {
    return (
        <footer className='footer-index' id='footer'>
            <div className='footer__titulos'>
                <h3 className='h3__bold'>Contacto</h3>
                <p className='p__descripcion'>Dejanos tu mensaje y nos pondremos en contacto con vos a la brevedad</p>
            </div>
            <div className='footer__contacto row'>
                <div className="footer__form col-sm-12 col-md-6">
                    <FormularioContacto />
                </div>
                <div className="footer__links col-sm-12 col-md-6">
                    <div className="footer__links__redes">
                        <p>O a través de otro medio:</p>
                        <p><i className='fas fa-phone-alt logo-redes'></i>3815123456</p>
                        <p><i className='fas fa-envelope logo-redes'></i>consultas@rollingvet.guau</p>
                        <a className="instagram__footer" href="https://www.instagram.com/rollingvet" target="_blank"><i className="fa fa-instagram logo-redes"></i>RollingVet</a>
                        <p><i className='fas fa-map-marker-alt logo-redes'></i>25 de mayo 512, San Miguel de Tucuman</p>
                    </div>
                </div>
            </div>
            <div className="footer__derechos">
                <p>© 2020 RollingVet<br />Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;