<<<<<<< HEAD

// TAREA: METER EN SEEDS VARIAS FECHAS, HORAENTRADA, HORASALIDA.
//        (res.send) nombre usuario


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaFecha = new Schema(
  {
    fecha: String,
    horaEntrada: String,
    horaSalida: String, 
  },
  {
    timestamps: {
      createdAt: "creado",
      updatedAt: "actualizado",
    },
  }
);

const Fecha = mongoose.model("Fecha", esquemaFecha);
module.exports = Fecha;

=======

// TAREA: METER EN SEEDS VARIAS FECHAS, HORAENTRADA, HORASALIDA.
//        (res.send) nombre usuario


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaFecha = new Schema(
  {
    fecha: String,
    horaEntrada: String,
    horaSalida: String, 
  },
  {
    timestamps: {
      createdAt: "creado",
      updatedAt: "actualizado",
    },
  }
);

const Fecha = mongoose.model("Fecha", esquemaFecha);
module.exports = Fecha;

>>>>>>> a23d84d86b15e3785f68334973c12e900dadb6de