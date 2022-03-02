import React from "react";
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
import User from "./pages/user/User";
import Perfil from "./pages/user/perfil/Perfil";
import PlanesUser from "./pages/user/planes/PlanesUser";
import EditarPassword from "./pages/admin/pacientes/crudPacientes/editarPassword/EditarPassword";

scrollDetection();

function App() {
  const [user, setUser] = React.useState({});
  const [isAdmin, setIsAdmin] = React.useState(false);

  const testAuth = async (isProtected) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth", {
        method: "GET",
        credentials: "include",
      })

      if(!res.ok){
        setUser({dni: 0}); //error en el servidor
        return;
      }

      const data = await res.json();

      if (data.code === 200) {
        setUser(data.user);
        if(data.user.dni==="1") setIsAdmin(true);

        const url = window.location.href;
        if(!(url.includes("/user") || url.includes("/admin"))){
          if(data.user.dni==="1") window.location.href="/admin";
          else window.location.href="/user";
        } 
        else if (data.user.dni!=="1" && url.includes("/admin")){
          window.location.href="/user";
        }
        else if (data.user.dni==="1" && url.includes("/user")){
          window.location.href="/admin";
        }
      } else {
        setIsAdmin(false);

        if(isProtected && window.location.href!=="/") window.location.href="/";
      }
    } catch (err) {}
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Index
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/planes"
            element={
              <Planes
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/registro"
            element={
              <Registro
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/citas"
            element={
              <Citas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/citas/:id"
            element={
              <VerCitas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/citas/new"
            element={
              <NuevaCita
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/pacientes"
            element={
              <Pacientes
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/pacientes/:id"
            element={
              <CrudPacientes
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/pacientes/:id/password"
            element={
              <EditarPassword
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/pacientes/:id/mascotas"
            element={
              <CrudMascotas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/pacientes/:id/mascotas/:id"
            element={
              <EditarMascota
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/veterinarios"
            element={
              <Veterinarios
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/admin/precios"
            element={
              <Precios
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user"
            element={
              <User
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/perfil"
            element={
              <Perfil
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/perfil/planes"
            element={
              <PlanesUser
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/perfil/mascotas"
            element={
              <CrudMascotas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/perfil/password"
            element={
              <EditarPassword
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/perfil/mascotas/:codigoMascota"
            element={
              <EditarMascota
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/citas"
            element={
              <Citas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/citas/new"
            element={
              <NuevaCita
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="/user/citas/:id"
            element={
              <VerCitas
                testAuth={testAuth}
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
          <Route
            path="*"
            element={
              <Pag404
                isAdmin={isAdmin}
                user={user}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
