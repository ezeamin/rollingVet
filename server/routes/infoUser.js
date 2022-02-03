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

      DbCitas.countDocuments({ dni: req.params.dni, atendido: false }, (err, count) => {
        let qtyCitas = count;

        res.status(200).json({ mascotas: qtyMascotas, citas: qtyCitas });
      });
    }
  });
})

router.get("/api/user/pacientes/mascotas/:dni", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, doc) => {
    if (doc) {
      res.status(200).json({ mascotas: doc.mascotas });
    }
    else {
      res.status(500).json({ ok: false });
    }
  });
});

router.put("/api/user/guardarPlan/:dni/:codigoMascota", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, doc) => {
    if (doc) {
      let mascota = doc.mascotas.find(mascota => mascota.codigoMascota === req.params.codigoMascota);
      if (mascota) {
        mascota.plan = req.body.plan;
        doc.save((err, mascota) => {
          if (err) {
            res.status(500).json({ ok: false });
          }
          else {
            res.status(200).json({ ok: true });
          }
        });
      }
      else {
        res.status(500).json({ ok: false });
      }
    }
    else {
      res.status(500).json({ ok: false });
    }
  });
});

//citas 

router.get("/api/citasProgramadas/:dni", (req, res) => {
  DbCitas.find({ dni: req.params.dni, atendido: false }, (err, docs) => {
    res.status(200).json({ citas: docs });
  });
});

module.exports = router;
