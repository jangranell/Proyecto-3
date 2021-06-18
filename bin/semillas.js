/*

Si  ejecutamos: "node semillas.js" ;  
limpia MongoDB errores/otras entradas y escribe users(Ln27)

*/

require("dotenv").config();

const mongoose = require("mongoose");

const Usuario = require("../models/Usuario");
const Dia = require("../models/Dia");

mongoose
  .connect(
    `mongodb+srv://JanGranell:123456789Mongo@cluster0.gsl6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Estamos conectados a la base de datos.");
  })
  .catch((error) => {
    console.log(error);
  });
////////////// USUARIOS
let usuarios = [
  {
    nombre: "Eduardo",
    apellido: "Álvarez",
    identificacion: "Jefe",
    dni: "12345678Z",
    role: "Boss",
    equipo: ["60c5fbdc8c3b2720a2e13643", "60c5fbdc8c3b2720a2e13644"],
    _id: "60c5fbdc8c3b2720a2e13640",
    dias: [],
  },
  {
    nombre: "Lluis",
    apellido: "García",
    identificacion: "Jefe2",
    dni: "00000004C",
    role: "Boss",
    equipo: ["60c5fbdc8c3b2720a2e13645", "60c5fbdc8c3b2720a2e13646"],
    _id: "60c5fbdc8c3b2720a2e13641",
    dias: [],
  },
  {
    nombre: "Jan",
    apellido: "Granell",
    identificacion: "ADMIN",
    dni: "49875478R",
    role: "Admin",
    _id: "60c5fbdc8c3b2720a2e13642",
    equipo: [],
    dias: [],
  },
  {
    nombre: "User1",
    apellido: "User",
    identificacion: "User1",
    dni: "00000001A",
    role: "User",
    _id: "60c5fbdc8c3b2720a2e13643",
    equipo: [],
    dias: [],
  },
  {
    nombre: "User2",
    apellido: "User",
    identificacion: "User2",
    dni: "00000002B",
    role: "User",
    _id: "60c5fbdc8c3b2720a2e13644",
    equipo: [],
    dias: [],
  },
  {
    nombre: "User3",
    apellido: "User",
    identificacion: "User3",
    dni: "00000003C",
    role: "User",
    _id: "60c5fbdc8c3b2720a2e13645",
    equipo: [],
    dias: [],
  },
  {
    nombre: "User4",
    apellido: "User",
    identificacion: "User4",
    dni: "00000005C",
    role: "User",
    _id: "60c5fbdc8c3b2720a2e13646",
    equipo: [],
    dias: [],
  },
];

///////////
Usuario.deleteMany()
  .then(() => {
    console.log(`usuarios antiguas eliminadas.`);
    return Usuario.create(usuarios);
  })
  .then((usuariosCreadas) => {
    console.log(
      `${usuariosCreadas.length} usuarios creadas con los siguientes nombres:`
    );
    usuariosCreadas.forEach((usuario) => {
      console.log(usuario.nombre);
    });
  })
  .catch((error) => {
    console.log("Ha ocurrido el siguiente error:");
    console.log(error);
  });
