export default function validateString(str) {
  const re = /^[A-Za-z\sáéíóú]+$/;
  return re.test(str) ? true : false;
}
