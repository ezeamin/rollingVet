export default function convertir(fecha) {
  let fechaArray = fecha.split("-");
  let fechaDate = new Date(fechaArray[0], fechaArray[1] - 1, fechaArray[2]);
  let mes = fechaDate.getMonth() + 1;
  let dia = fechaDate.getDate();
  let anio = fechaDate.getFullYear();

  if (dia < 10) {
    dia = "0" + dia;
  }
  if (mes < 10) {
    mes = "0" + mes;
  }

  return `${dia}/${mes}/${anio}`;
};
