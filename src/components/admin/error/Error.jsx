import React from 'react';
import './error.css'

const Error = () => {
    return (
        <div className='error__page container text-center'>
            <h3 className='h3__bold'>Error</h3>
            <p className='p__descripciones'>Se agotó el tiempo de espera. Por favor, intenta nuevamente en unos minutos</p>
            <div className="error__img mt-5">
                <img src="/img/pag404/broken-bone.png" alt="hueso roto - error" />
            </div>
        </div>
    );
};

export default Error;