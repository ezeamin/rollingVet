export default function animateGallery() {
  let imgEnUso = [5, 2, 1, 4, 3];
  let ultimo = 0;
  let int1, int2;

  const cambiar = (multiplier) => {
    let num1;
    do {
      num1 = Math.floor(Math.random() * multiplier) + 1;
    } while (num1 === ultimo);

    let id = "main__grid";
    id += "-" + num1;
    const elem = document.getElementById(id);

    //terminar al cambiar pagina
    if (elem == null) {
      clearInterval(int1);
      clearInterval(int2);
      return;
    }

    ultimo = num1;

    let num2, error;
    do {
      error = false;
      num2 = Math.floor(Math.random() * 12) + 1;

      if (imgEnUso.includes(num2)) error = true;
    } while (error);

    let valor = parseInt(elem.src.split("/")[6].split(".")[0]);

    let imagenes = imgEnUso;
    let index = imagenes.indexOf(valor);
    imagenes.splice(index, 1);

    imagenes.push(num2);
    imgEnUso = imagenes;

    elem.src = "img/index/gallery/" + num2 + ".jpg";
  };

  int1 = setInterval(() => {
    let multiplier;
    if (window.innerWidth < 768) {
      multiplier = 3;
      if (imgEnUso.length > 3) {
        imgEnUso.splice(-2, 3);
      }
    } else {
      multiplier = 5;
      if (imgEnUso.length < 5) {
        let imagenes = [];

        let id, elem, valor;
        imgEnUso = [];
        for (let i = 1; i <= 5; i++) {
          id = "main__grid-" + i;
          elem = document.getElementById(id);
          valor = parseInt(elem.src.split("/")[6].split(".")[0]);
          imagenes.push(valor);
        }

        imgEnUso = imagenes;
      }
    }

    cambiar(multiplier);
  }, 4000);

  setTimeout(() => {}, 1500);

  int2 = setInterval(() => {
    if (window.innerWidth > 768) {
      cambiar(5);
    }
  }, 4500);

  setTimeout(() => {
    clearInterval(int1);
    clearInterval(int2);
  }, 60000);
}
