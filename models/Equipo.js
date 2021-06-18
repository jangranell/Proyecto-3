<<<<<<< HEAD
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

=======
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

>>>>>>> a23d84d86b15e3785f68334973c12e900dadb6de
