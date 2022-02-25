import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioEditarContraseña from './formularioEditarContraseña/FormularioEditarContraseña';

const PanelEditarContraseña = (props) => {
    const navigate = useNavigate();

    const navigateSuccess = () => {
        navigate(-1);
    }

    return (
        <div className="admin__panel__pacientes-newUser py-5 admin__panel__pacientes-content">
            <h1 className='h3__bold'>Modificar contraseña</h1>
          <FormularioEditarContraseña
            dni={props.dni}
            navigateSuccess={navigateSuccess}
          />
        </div>
      );
};

export default PanelEditarContraseña;