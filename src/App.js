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

scrollDetection();

function App() { 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/citas" element={<Citas />} />
          <Route path="/admin/citas/:id" element={<VerCitas />} />
          <Route path="/admin/citas/new" element={<NuevaCita />} />
          <Route path="/admin/pacientes" element={<Pacientes />} />
          <Route path="/admin/pacientes/:id" element={<CrudPacientes />} />
          <Route path="/admin/pacientes/:id/mascotas" element={<CrudMascotas />} />
          <Route path="/admin/veterinarios" element={<Veterinarios />} />
          <Route path="/admin/precios" element={<Precios />} />
          <Route path="*" element={<Pag404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
