import React from "react";
import "./main.css";
import animateGallery from "../../../js/animateGallery";

const Main = () => {
  React.useEffect(() => {
    animateGallery(true);
  }, []);

  return (
    <article className="text-center main">
      <h1 className="main__title">Donde el cuidado animal importa.</h1>
      <div className="main__grid">
        <div
          id="main__grid-chico-izq-top"
          className="main__grid-container-small"
        >
          <img
            id="main__grid-1"
            src="img/index/gallery/5.jpg"
            alt="Rolling vet"
          />
        </div>
        <div
          id="main__grid-chico-izq-down"
          className="main__grid-container-small"
        >
          <img
            id="main__grid-2"
            src="img/index/gallery/2.jpg"
            alt="Rolling vet"
          />
        </div>
        <div
          id="main__grid-chico-der-top"
          className="main__grid-container-small"
        >
          <img
            id="main__grid-4"
            src="img/index/gallery/3.jpg"
            alt="Rolling vet"
          />
        </div>
        <div
          id="main__grid-chico-der-bottom"
          className="main__grid-container-small"
        >
          <img
            id="main__grid-5"
            src="img/index/gallery/4.jpg"
            alt="Rolling vet"
          />
        </div>
        <div id="main__grid-grande" className="main__grid-container-large">
          <img
            id="main__grid-3"
            src="img/index/gallery/1.jpg"
            alt="Rolling vet"
          />
        </div>
      </div>
      <div className="main__scrollDown mt-2">
        <p className="">
          <i className="fas fa-angle-double-down"></i>
        </p>
      </div>
    </article>
  );
};

export default Main;
