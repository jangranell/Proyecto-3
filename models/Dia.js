const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaDia = new Schema(
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

const Dia = mongoose.model("Dia", esquemaDia);
module.exports = Dia;