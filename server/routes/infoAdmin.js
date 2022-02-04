const express = require("express");
const router = express.Router();

const DbPacientes = require("../models/paciente");
const DbCitas = require("../models/cita");
const DbFechas = require("../models/fechas");
const DbPrecios = require("../models/precios");

router.get("/api/qty", (req, res) => {
  DbPacientes.countDocuments({}, (err, count) => {
    let pacientes = count;
    if (pacientes != 0) pacientes--;

    if(err){
      res.status(500).json({ok: false})
      return;
    }

    DbCitas.countDocuments({ atendido: false }, (err, count) => {
      let citas = count;

      res.status(200).json({
        ok: true,
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
  const codigoCita = generarCodigo();

  const cita = new DbCitas({
    codigoCita: codigoCita,
    fecha: req.body.fecha,
    hora: req.body.hora,
    atendido: false,
    codigoMascota: req.body.codigoMascota,
    paciente:{
      dni: req.body.paciente.dni,
      nombre: req.body.paciente.nombre,
      apellido: req.body.paciente.apellido,
      avatar: req.body.paciente.avatar,
    },
    mascota: req.body.mascota,
    veterinario: req.body.veterinario,
    comentarios: req.body.comentarios,
  });

  DbCitas.create(cita, (err, cita) => {
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

router.get("/api/citas/:codigoCita", (req, res) => {
  DbCitas.find({ codigoCita: req.params.codigoCita }, (err, cita) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        cita: cita[0],
      });
    }
  });
});

router.put("/api/citas/:codigoCita", (req, res) => {
  DbCitas.findOneAndUpdate( { codigoCita: req.params.codigoCita }, req.body, { new: true }, (err, cita) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
      });
    }
  });
});

router.delete("/api/citas/:codigoCita", (req, res) => {
  DbCitas.findOneAndDelete({ codigoCita: req.params.codigoCita }, (err, cita) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
      });
    }
  });
});

router.get("/api/fechas/:fecha", (req, res) => {
  DbFechas.find({ fecha: req.params.fecha }, (err, fecha) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        datos: fecha[0] ? fecha[0].ocupados : null,
      });
    }
  });
})

router.put("/api/fechas", (req, res) => {
  DbFechas.findOne({fecha: req.body.fecha}, (err, doc) => {
    if(doc){
      doc.ocupados.push(req.body.hora);
      doc.save();
    }
    else{
      let doc = new DbFechas({
        fecha: req.body.fecha,
        ocupados: [req.body.hora],
      });
      doc.save();
    }
  });

  res.status(200).json({ok: true, datos: req.body});
});

//precios

router.get("/api/precios", (req, res) => {
  DbPrecios.find({}, (err, precios) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
        precios,
      });
    }
  });
})

router.put("/api/precios", (req, res) => {
  DbPrecios.findOneAndUpdate({plan: req.body.plan}, req.body, { new: true }, (err, precios) => {
    if (err) {
      res.status(500).json({
        ok: false,
        err,
      });
    } else {
      res.status(200).json({
        ok: true,
      });
    }
  });
})

module.exports = router;