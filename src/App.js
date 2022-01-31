import React from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./pages/index/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Planes from "./pages/planes/Planes";
import scrollDetection from "./js/scroll";
import Pag404 from "./pages/pag404/Pag404";
import Registro from "./pages/registro/Registro";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import Citas from "./pages/admin/citas/Citas";
import VerCitas from "./pages/admin/citas/verCita/VerCita";
import Pacientes from "./pages/admin/pacientes/Pacientes";
import Veterinarios from "./pages/admin/veterinarios/Veterinarios";
import Precios from "./pages/admin/precios/Precios";
import CrudPacientes from "./pages/admin/pacientes/crudPacientes/CrudPacientes";
import NuevaCita from "./pages/admin/citas/nuevaCita/NuevaCita";
import CrudMascotas from "./pages/admin/pacientes/crudMascotas/CrudMascotas";
import EditarMascota from "./pages/admin/pacientes/crudMascotas/editarMascota/EditarMascota";
import User from './pages/user/User';
import Perfil from './pages/user/perfil/Perfil';

scrollDetection();

function App() { 
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isAdmin, setIsAdmin] = React.useState(false);

  const getAuthentication = async () => {
    const res = await fetch("/api/auth", {
      method: "GET",
      credentials: "include",
    }).catch(err => console.log(err));
    const data = await res.json();

    if (data.code === 200) {
      setIsAuthenticated(true);
      setUser(data.user);

      const res2 = await fetch("/api/isAdmin", {
        method: "GET",
      });
      const data2 = await res2.json();
      if(data2.isAdmin) setIsAdmin(true);
    }
    else{
      setIsAuthenticated(false); //pomer en true para empezar, como isAdmin
    }
  };

  React.useEffect(() => {
    getAuthentication();
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/planes" element={<Planes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/registro" element={<Registro isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/login" element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin" element={<Admin isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/citas" element={<Citas isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/citas/:id" element={<VerCitas isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/citas/new" element={<NuevaCita isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/pacientes" element={<Pacientes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/pacientes/:id" element={<CrudPacientes isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/pacientes/:id/mascotas" element={<CrudMascotas isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/pacientes/:id/mascotas/:id" element={<EditarMascota isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/veterinarios" element={<Veterinarios isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/admin/precios" element={<Precios isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/user" element={<User isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="/user/perfil" element={<Perfil isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
          <Route path="*" element={<Pag404 isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUser={setUser} user={user}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
