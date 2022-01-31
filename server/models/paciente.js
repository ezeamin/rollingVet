const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const mascotaSchema = new Schema({
  codigoMascota: String,
  especie: String,
  raza: String,
  nombre: String,
  fechaNac: String,
  sexo: String,
});

const userSchema = new Schema({
  email: String,
  password: String,
  nombre: String,
  apellido: String,
  genero: String,
  dni: String,
  avatar: String,
  plan: String,
  mascotas: [mascotaSchema],
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10)
};

userSchema.methods.comparePassword = (password,password2) =>{
  //console.log("pass: " + password +", this.pass: "+password2);
  return bcrypt.compareSync(password, password2);
};

module.exports = mongoose.model('Pacientes', userSchema);
