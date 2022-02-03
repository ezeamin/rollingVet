import React from "react";
import CardAdmin from "../../admin/panel/card/CardAdmin";
import List from "../../admin/panel/list/List";
import "./panelUser.css";
import Carga from "../../admin/carga/Carga";
import { useNavigate } from "react-router-dom";

const PanelUser = (props) => {
  const [mascotas, setMascotas] = React.useState(0);
  const [citas, setCitas] = React.useState(0);
  const [cargando, setCargando] = React.useState(true);
  const navigate = useNavigate();

  const info = [
    {
      titulo: "Mascotas",
      cantidad: mascotas,
    },
    {
      titulo: "Citas programadas",
      cantidad: citas,
    },
  ];

  React.useEffect(() => {
    const traerInfo = async () => {
      const response = await fetch(`/api/user/qty/${props.user.dni}`, {
        method: "GET",
      });
      const info = await response.json();
      setMascotas(info.mascotas);
      setCitas(info.citas);
      setCargando(false);
    };
    if(props.user.dni !== undefined){
      traerInfo();
    }
  }, [props.user.dni]);

  const btnCitas = () => {
    navigate("/user/citas");
  };

  if (cargando) return <Carga />;
  return (
    <div className="container py-5 admin__panel-content">
      <h1 className="mb-3 h3__bold">Dashboard</h1>
      <div className="row user__panel-content">
        <div className="col-sm-12 col-lg-6 col-xl-4">
          <div className="row admin__panel-content-cards">
            {info.map((info, index) => (
              <CardAdmin key={index} {...info} isAdmin={false} />
            ))}
          </div>
        </div>
        <div className="col-sm-12 col-lg-6 col-xl-8">
            <div className="row admin__panel-content-cards">
                <List
                    titulo="Lista de citas"
                    content="citasPropias"
                    handleClick={btnCitas}
                    dni={props.user.dni}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PanelUser;
