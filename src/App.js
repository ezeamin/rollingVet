import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./pages/index/Index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Planes from "./pages/planes/Planes";
import scrollDetection from "./js/scroll";
import Pag404 from "./pages/Pag404";

scrollDetection();

function App() { 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="*" element={<Pag404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
