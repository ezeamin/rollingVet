const express = require("express");
const router = express.Router();

const DbPacientes = require("../models/paciente");
const DbCitas = require("../models/cita");

router.get("/api/qty", (req, res) => {
  DbPacientes.countDocuments({}, (err, count) => {
    let pacientes = count;
    if (pacientes != 0) pacientes--;

    DbCitas.countDocuments({ atendido: false }, (err, count) => {
      let citas = count;

      res.status(200).json({
        pacientes: pacientes,
        citas: citas,
      });
    });
  });
});

router.get("/api/pacientes", (req, res) => {
  DbPacientes.find({ dni: { $ne: 1 } }, (err, pacientes) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        pacientes,
      });
    }
  });
});

router.get("/api/pacientes/:dni", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, paciente) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        paciente,
      });
    }
  });
});

router.delete("/api/pacientes/:dni", (req, res) => {
  DbPacientes.findOneAndDelete({ dni: req.params.dni }, (err, paciente) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        paciente,
      });
    }
  });
});

router.put("/api/pacientes/editar", (req, res) => {
  DbPacientes.findOneAndUpdate(
    { dni: req.body.dni },
    req.body,
    { new: true },
    (err, paciente) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err,
        });
      } else {
        res.status(200).json({
          ok: true,
          paciente,
        });
      }
    }
  );
});

router.get("/api/pacientes/:dni/:codigoMascota", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, paciente) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      const mascota = paciente.mascotas.find(
        (mascota) => mascota.codigoMascota === req.params.codigoMascota
      );
      res.status(200).json({
        ok: true,
        mascota,
      });
    }
  });
});

const generarCodigo = () => {
  let codigo = "";
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 6; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

router.put("/api/pacientes/mascota/:dni", (req, res) => {
  DbPacientes.findOne({ dni: req.params.dni }, (err, paciente) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      let mascota = req.body;

      if (mascota.codigoMascota === "") {
        //nueva mascota
        mascota.codigoMascota = generarCodigo();
        paciente.mascotas.push(mascota);
      } else {
        //editar mascota
        const mascotaIndex = paciente.mascotas.findIndex(
          (mascota) => mascota.codigoMascota === req.body.codigoMascota
        );
        paciente.mascotas[mascotaIndex] = mascota;
      }

      paciente.save();
      res.status(200).json({ code: 200 });
    }
  });
});

//citas

router.get("/api/citasProgramadas", (req, res) => {
  DbCitas.find({ atendido: false }, (err, citas) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        citas,
      });
    }
  });
});

router.get("/api/citasRegistro", (req, res) => {
  DbCitas.find({ atendido: true }, (err, citas) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        citas,
      });
    }
  });
});

router.post("/api/citas", (req, res) => {
  DbCitas.create(req.body, (err, cita) => {
    if(err){
      res.status(500).json({
        ok: false,
        err,
      });
    }
    else{
      res.status(200).json({
        ok: true,
        cita,
      });
    }
  });
});

module.exports = router;
