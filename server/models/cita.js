const mongoose = require('mongoose');
const { Schema } = mongoose;

const citaSchema = new Schema({
  dni: String,
  codigoMascota: String,
  nombre: String,
  apellido: String,
  mascota: String,
  veterinario: String,
  fecha: String,
  hora: String,
  atendido: Boolean
});

module.exports = mongoose.model('Citas', citaSchema);
