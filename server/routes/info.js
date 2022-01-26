const express = require("express");
const router = express.Router();

const DbPacientes = require("../models/paciente");
const DbCitas = require("../models/cita");

router.get("/api/qty", (req, res) => {
  DbPacientes.countDocuments({}, (err, count) => {
    let pacientes = count;
    if(pacientes!=0) pacientes--;

    DbCitas.countDocuments({ atendido: false }, (err, count) => {
      let citas = count;

      res.status(200).json({
        pacientes: pacientes,
        citas: citas,
      });
    });
  });
});

module.exports = router;
