export default function resize() {
  if (window.location.pathname.includes("/admin")) {
    if (window.innerWidth > 1200) {
      document.getElementsByClassName("admin__nav")[0].style.display = "block";
      document.getElementsByClassName(
        "admin__nav-container"
      )[0].style.transform = "translateX(0%)";
      document.getElementsByClassName("admin__nav-bg")[0].style.opacity = "1";
    } else {
      document.getElementsByClassName("admin__nav")[0].style.display = "none";
      document.getElementsByClassName(
        "admin__nav-container"
      )[0].style.transform = "translateX(-100%)";
      document.getElementsByClassName("admin__nav-bg")[0].style.opacity = "0";
    }
  }
}
