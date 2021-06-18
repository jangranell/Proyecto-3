const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaUsuarios = new Schema(
  {
    nombre: String,
    apellido: String,
    identificacion: String,
    dni: String,
    role: String,
    equipo: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
    dias: [{ type: Schema.Types.ObjectId, ref: "Dia" }],
  },
  {
    timestamps: {
      createdAt: "creado",
      updatedAt: "actualizado",
    },
  }
);

const usuarios = mongoose.model("Usuarios", esquemaUsuarios);
module.exports = usuarios;

