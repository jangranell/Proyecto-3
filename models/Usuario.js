const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaUsuario = new Schema(
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

const Usuario = mongoose.model("Usuario", esquemaUsuario);
module.exports = Usuario;

