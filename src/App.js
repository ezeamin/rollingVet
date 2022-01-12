import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Swal from 'sweetalert2';
import { Clientes, Clima, Footer, Header, Info, Main, Planes, Profesionales } from "./components";

function App() {

  window.addEventListener('scroll', function () {
    let fab = document.getElementsByClassName('fab')[0];
    let windowPosition = window.scrollY > 200;

    fab.classList.toggle('scrolling-active__fab', windowPosition);
  })

  return (
    <div className="App">
      <a href="#" className="fab">
        <i className="fas fa-arrow-up"></i>
      </a>
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
