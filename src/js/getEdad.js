export default function getEdad(fecha) {
  const fechaActual = new Date();
  const fechaNacimiento = new Date(fecha);

  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
  let dia = fechaActual.getDate() - fechaNacimiento.getDate();

  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }

  return edad;
}
