import React from 'react';
import Navegacion from '../../components/admin/navegacion/Navegacion';
import Panel from '../../components/admin/panel/Panel';
import './admin.css';
import HeaderAdmin from '../../components/admin/headerAdmin/HeaderAdmin';

const Admin = () => {
    return (
        <div className='row'>
            <div className='col-md-12 col-lg-2 admin__nav'>
                <Navegacion />
            </div>
            <div className='col-md-12 col-lg-10'>
                <HeaderAdmin />
                <Panel />
            </div>
        </div>
    );
};

export default Admin;