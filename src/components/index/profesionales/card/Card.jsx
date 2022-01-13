import React from 'react';
import './card.css';

const Card = (props) => {
    const[info, setInfo] = React.useState({})

    React.useEffect(() => {
        switch(props.profesional){
            case 0:{
                setInfo({
                    name: "Ezequiel Amin",
                    image: "img/index/profesionales/ezequiel.png",
                })
                break;
            }
            case 1:{
                setInfo({
                    name: "Elsa Capunta",
                    image: "img/index/profesionales/elsa.jpg",
                })
                break;
            }
            case 2:{
                setInfo({
                    name: "Esteban Dido",
                    image: "img/index/profesionales/esteban.jpg",
                })
                break;
            }
            case 3:{
                setInfo({
                    name: "Armando Paredes",
                    image: "img/index/profesionales/armando.jpg",
                })
                break;
            }
            default:{}
        }
    },[]);

    return (
        <div className='card__container'>
            <div className='card__image'>
                <img src={info.image} alt={info.name}/>
            </div>
            <div className='card__body'>
                <h3 className='card__body-name'>{info.name}</h3>
            </div>
        </div>
    );
};

export default Card;