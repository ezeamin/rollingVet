export default function scrollDetection() {
  const scroll = window.pageYOffset;

  if (scroll > 0){
    //anular transiciones al cambiar pagina
    document.getElementsByClassName("logo")[0].style.transition = "none";
    document.querySelector("header").style.transition = "none";
    
    //actualizar estado segun scroll
    modificar(true, true);

    //restaurar transiciones
    setTimeout(() => {
      document.getElementsByClassName("logo")[0].style.transition = "all 0.5s ease";
      document.querySelector("header").style.transition = "all 0.5s ease";
    },500);
  }

  window.addEventListener("scroll", function () {
    let windowPosition = window.scrollY > 200;
    let windowPosition2 = window.scrollY > 30;

    modificar(windowPosition, windowPosition2);
  });
}

const modificar = (windowPosition, windowPosition2) => {
  let header = document.querySelector("header");
  let links = document.getElementsByClassName("header__container__links")[0];
  let logo = document.getElementsByClassName("logo")[0];
  let fab = document.getElementsByClassName("fab")[0];
  let fabContacto = document.getElementsByClassName("fab-contacto")[0];

  header.classList.toggle("scrolling-active", windowPosition2);
  links.classList.toggle("scrolling-active__links", windowPosition2);
  logo.classList.toggle("scrolling-active__logo", windowPosition2);

  fab.classList.toggle("scrolling-active__fab", windowPosition);
  if (fabContacto != null)
    fabContacto.classList.toggle(
      "scrolling-active__fab-contacto",
      windowPosition
    );
};
