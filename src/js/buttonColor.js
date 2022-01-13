export default function cambiarColor(color) {
  let estilo = window.getComputedStyle(document.body);
  let primaryDark = estilo.getPropertyValue("--global-color-primary-dark");

  if(color!=="primary"){
    let secondary = estilo.getPropertyValue("--global-color-secondary");
    let secondaryDark = estilo.getPropertyValue("--global-color-secondary-dark");
    let botones = document.getElementsByClassName("btnForm");
    for (let i = 0; i < botones.length; i++) {
        botones[i].style.backgroundColor = secondary;
    }

    let root = document.documentElement;
    root.style.setProperty("--global-color-primary-dark", secondaryDark);
  }

  return primaryDark;
}
