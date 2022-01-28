import React from "react";
import FormularioLogin from "../../components/login/FormularioLogin";
import Header from "../../components/registro/header/HeaderRegistro";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (props.isAuthenticated) {
      navigate("/");
    }
  }, [props.isAuthenticated]);

  const navigateSuccess = (isAdmin) => {
    props.setIsAuthenticated(true);

    if (isAdmin) {
      props.setIsAdmin(true);
      navigate("/admin");
    } else {
      props.setIsAdmin(false);
      navigate("/");
    }
  };

  return (
    <div className="registro__container">
      <Header />
      <main className="main__registro">
        <div className="main__registro-content">
          <div className="titulos__registro">
            <div>
              <h3 className="h3__bold mb-0">Bienvenido</h3>
              <p className="p__registro">Ingrese sus datos</p>
            </div>
            <div className="titulos__registro-img">
              <img src="/img/login/dog.jpg" alt="perro doctor" />
            </div>
          </div>
          <FormularioLogin navigateSuccess={navigateSuccess} />
        </div>
      </main>
    </div>
  );
};

export default Login;
