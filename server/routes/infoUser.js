const express = require("express");
const router = express.Router();

const DbPacientes = require("../models/paciente");
const DbCitas = require("../models/cita");
const DbFechas = require("../models/fechas");
const DbPrecios = require("../models/precios");

router.get("/api/user/qty/:dni", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, doc) => {
    if (doc) {
      let qtyMascotas = doc.mascotas.length;

      DbCitas.countDocuments({ dni: req.params.dni }, (err, count) => {
        let qtyCitas = count;

        res.status(200).json({ mascotas: qtyMascotas, citas: qtyCitas });
      });
    }
  });
});

router.get("/api/citasProgramadas/:dni", (req, res) => {
  DbCitas.find({ dni: req.params.dni, atendido: false }, (err, docs) => {
    res.status(200).json({ citas: docs });
  });
});

module.exports = router;
