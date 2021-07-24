// TODO: FindByIdAnDelete  && FindByIdAndUpdate &&  SIGN UP AUTH
require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/Usuario");

const Equipo = require("../models/Equipo");

const Dia = require("../models/Dia");

const expirationTime = 1800;

const salt = bcryptjs.genSaltSync(10);

const tokenValidation = require("../functions/tokenValidation");
const { findByIdAndUpdate } = require("../models/Usuario");

// Prueba React

authRoutes.get("/", (req, res) => {
  res.send({ message: "back end" });
});

//* SIGN UP //
// Ejemplo
/*
  {
    "nombre": "prueba",
  "apellido": "numero1",
    "dni": "12345679Z",
    "role": "User"
  } 
  */

authRoutes.post("/signup", async (req, res) => {
  let user = await tokenValidation(res, "Admin");

  const nombreU = req.body.nombre;
  const apellidoU = req.body.apellido;
  const dniU = req.body.dni;
  const roleU = req.body.role;

  if (!nombreU || !apellidoU || !dniU || !roleU) {
    res.send({
      auth: false,
      token: null,
      message: `Provide remaining data (Nombre, Apellido, Dni, Role)`,
    });
    return;
  }

  let foundUser = await User.findOne({ dni: dniU }).then((repeatedUser) => {
    return repeatedUser;
  });

  if (foundUser != null) {
    res.send({
      auth: false,
      token: null,
      message: `User name is already taken. Choose another one`,
    });
    return;
  }

  let newUser = await User.create({
    nombre: nombreU,
    apellido: apellidoU,
    dni: dniU,
    role: roleU,
  })
    .then((createdUser) => {
      return createdUser;
    })
    .catch((error) => {
      res.send({
        auth: false,
        token: null,
        message: `We have get the following error: ${error}`,
      });
      return;
    });

  const newToken = jwt.sign({ id: newUser._id }, process.env.SECRET_WORD, {
    expiresIn: expirationTime,
  });

  res.send({
    auth: true,
    token:
      newToken /* nombre: newUser.nombre, apellido: newUser.apellido, dni: newUser.dni, role: newUser.role*/,
  });
});

//* LOG IN

authRoutes.post("/login", async (req, res) => {
  let nombre = req.body.nombre;
  let dni = req.body.dni;
  let user = await User.findOne({ nombre: nombre, dni: dni }).then(
    (userFound) => {
      return userFound;
    }
  );
  if (!user) {
    res.send({
      auth: false,
      token: null,
      message: "User does not exist, check for spelling mistakes",
    });
    return;
  }

  const newToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_WORD,
    {
      expiresIn: expirationTime,
    }
  );

  res.send({
    auth: true,
    Nombre: user.nombre,
    Apellido: user.apellido,
    DNI: user.dni,
    Role: user.role,
    token: newToken,
    ID: user._id,
  });
});

//* RUTA PRIVADA

authRoutes.get("/private", async (req, res) => {
  const token = req.headers.token;
  let user = await tokenValidation(res, token);

  if (!user) {
    res.send({ auth: false, message: "User does not exist" });
    return;
  }
  res.send({ auth: true, message: "Welcome", user: user });
});

//* RUTA Admin

authRoutes.get("/admin", async (req, res) => {
  const token = req.headers.token;
  let user = await tokenValidation(res, token);

  if (!user) {
    return;
  }

  let usuarios = await User.find().then((users) => {
    return users;
  });
  let usuariosFiltrados = usuarios.filter((usuario) => {
    if (usuario.role !== "Admin") {
      return usuario;
    }
  });
  res.send({ usuariosFiltrados: usuariosFiltrados, auth: true });
});

//* RUTA Trabajador

authRoutes.get("/trabajador/:id", async (req, res) => {
  const token = req.headers.token;
  let user = await tokenValidation(res, token);

  if (!user) {
    return;
  }
  let id = req.params.id;
  let trabajador = await User.findById(id).populate("equipo").populate("dias")
  res.send({ trabajador: trabajador, auth: true });
});

//* FECHA HORA

authRoutes.put("/entrada", async (req, res) => {
  const token = req.headers.token;
  let user = await tokenValidation(res, token);

  if (!user) {
    return;
  }

  let fecha = req.body.fecha;
  let horaE = req.body.horaEntrada;
  let horaS = req.body.horaSalida;
  console.log(typeof req.body.horaSalida);
  let newDay = await Dia.create({
    fecha: fecha,
    horaEntrada: horaE,
    horaSalida: horaS,
  }).then((createdDay) => {
    return createdDay;
  });
  await User.findByIdAndUpdate(user._id, {
    $push: { dias: newDay._id },
  }).then((algo) => {
    return algo;
  });
  let populatedUser = await User.findById(user._id).populate("dias");
  res.send(populatedUser);
});

//RUTA Salida
authRoutes.put("/salida/:id", async (req, res) => {
  console.log(req.params.id);
  let id = req.params.id;
  let fecha = req.body.fecha;
  let horaE = req.body.horaEntrada;
  let horaS = req.body.horaSalida;

  await Dia.findByIdAndUpdate(id, {
    fecha: fecha,
    horaEntrada: horaE,
    horaSalida: horaS,
  }).then((algo) => {});
  res.send({ message: "salida" });
});

//* RUTA DELETE

authRoutes.delete("/deleteUser", async (req, res) => {
  let dni = req.headers.dni;
  console.log("dni:" + " " + dni);
  //HASTA AQUI FUNCIONA
  let user = await User.findByIdAndDelete({ dni: dni }).then((deletedUser) => {
    console.log(deletedUser);
    return deletedUser;
  });
  res.send(user);
  console.log("user deleted:" + " " + user);
});

//* RUTA UPDATE
/*
authRouteS.post("/updateUser", async (req, res) => {
  let dni = req.headers.dni;
  console.log("dni:"+" "+dni);
  let user = await User.findByIdAndUpdate({dni: dni}).then((updatedUser) => {
    console.log(updatedUser);
    return updatedUser;
  });
  res.send(user);
  console.log("user updated:"+" "+user);
*/
module.exports = authRoutes;
