const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const esquemaEquipo = new Schema(
  {
    nombre: String,
    integrantes: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
  },
  {
    timestamps: {
      createdAt: "creado",
      updatedAt: "actualizado",
    },
  }
);

const Equipo = mongoose.model("Equipo", esquemaEquipo);
module.exports = Equipo;

