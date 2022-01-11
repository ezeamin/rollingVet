import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from 'sweetalert2';
import { Clientes, Clima, Footer, Header, Info, Main, Planes, Profesionales } from "./components";

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">
        <div className="container">
          <div className="landing">
            <Header />
            <Main />
          </div>
          <Info />
          <Planes />
          <Clima />
          <Clientes />
          <Profesionales />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
