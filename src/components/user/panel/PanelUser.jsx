import React from "react";
import CardAdmin from "../../admin/panel/card/CardAdmin";
import List from "../../admin/panel/list/List";
import "./panelUser.css";
import Carga from "../../admin/carga/Carga";
import { useNavigate } from "react-router-dom";
import Mensaje from "./mensaje/Mensaje";
import Error from "../../admin/error/Error";

const PanelUser = (props) => {
  const [mascotas, setMascotas] = React.useState(0);
  const [citas, setCitas] = React.useState(0);
  const [cargando, setCargando] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [mascotaNull, setMascotaNull] = React.useState(false);
  const [mascotaPlanNull, setMascotaPlanNull] = React.useState(false);
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
    const abortCont = new AbortController();

    const traerInfo = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL+`/api/user/qty/${props.user.dni}`, {
          method: "GET",
          signal: abortCont.signal,
        });
        const info = await response.json();
        setMascotas(info.mascotas);
        setCitas(info.citas);
        setCargando(false);

        if(info.mascotas===0) {
          setMascotaNull(true);
        }
        else{
          const res = await fetch(process.env.REACT_APP_SERVER_URL+`/api/user/pacientes/mascotas/${props.user.dni}`, {
            method: "GET",
            signal: abortCont.signal,
          });
          
          if (!response.ok) {
            setCargando(false);
            setError(true);
            return;
          }
          
          const resMascotas = await res.json();

          resMascotas.mascotas.forEach((mascota) => {
            if(mascota.plan==="Sin plan"){
              setMascotaPlanNull(true);
              return;
            } 
          });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      }
    };
    if(props.user.dni === 0){
      setCargando(false);
      setError(true);
    }
    else if (props.user.dni) traerInfo();

    return () => {
      abortCont.abort();
    };
  }, [props.user.dni]);

  const btnCitas = () => {
    navigate("/user/citas");
  };

  //<p className="p__descripciones">Agregale un plan a tu(s) mascota(s) desde "Mi perfil"</p>

  if (cargando) return <Carga />;
  else if (error) return <Error />;
  return (
    <div className="container py-5 admin__panel-content">
      <h1 className="mb-3 h3__bold">Dashboard</h1>
      {mascotaNull ? 
        <Mensaje mensaje="Agrega tu primera mascota desde 'Mi perfil'" />
      : null}
      {mascotaPlanNull ? 
        <Mensaje mensaje="Agrega un plan a tu(s) mascota(s) desde 'Mi perfil'" />
      : null}
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
