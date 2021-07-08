// TODO: FindByIdAnDelete  && FindByIdAndUpdate &&  SIGN UP AUTH
require("dotenv").config();

const express = require("express");
const authRoutes = express.Router();

const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/Usuario");

const Equipo = require("../models/Equipo");

const expirationTime = 1800;

const salt = bcryptjs.genSaltSync(10);

const tokenValidation = require("../functions/tokenValidation");

// Prueba React

authRoutes.get("/", (req,res) => {
  res.send({message: "back end"});
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

////TODO ////
////* Los usuarios van a poder ver sus horas de entrada en "/private"  ////
////TODO ////

authRoutes.post("/login", async (req, res) => {
  let nombre = req.body.nombre;
  let dni = req.body.dni;
  console.log(req.body);
  let user = await User.findOne({ nombre: nombre, dni: dni }).then(
    (userFound) => {
      console.log(userFound);
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
    token: newToken,
    Nombre: user.nombre,
    Apellido: user.apellido,
    ID: user._id,
    DNI: user.dni,
  });
  //res.redirect('/private')
  res.send("ruta terminada");
});

//* RUTA PRIVADA

authRoutes.get("/private", async (req, res) => {
  const token = req.headers.token;
  //const dni = req.headers.dni;
  console.log(req);
  let user = await tokenValidation(res, token, "User");
  if (!token) {
    res.send({
      auth: false,
      message: "There is no token provided",
    });
    return;
  }
  const decoded = jwt.verify(token, process.env.SECRET_WORD);

  //?  const user = await User.findById(decoded.id).populate("equipo");

  if (!user) {
    res.send({ auth: false, message: "User does not exist" });
    return;
  }

  res.send(user);
  res.send("La ruta ha terminado.");
});

//* RUTA PRIVADA BOSS

authRoutes.get("/privateBoss", async (req, res) => {
  const token = req.headers.token;
  //const dni = req.headers.dni;
  if (!token) {
    res.send({
      auth: false,
      message: "There is no token provided",
    });
    return;
  }
  console.log(req);
  let user = await tokenValidation(res, token, "Boss");

  if (!user) {
    res.send({ auth: false, message: "User does not exist" });
    return;
  }

  const boss = await User.findById(user._id).populate("equipo");

  res.send(boss);
});

//* RUTA PRIVADA ADMIN

authRoutes.get("/privateAdmin", async (req, res) => {
  const token = req.headers.token;
  //const dni = req.headers.dni;
  if (!token) {
    res.send({
      auth: false,
      message: "There is no token provided",
    });
    return;
  }
  console.log(req);
  let user = await tokenValidation(res, token, "Admin");

  if (!user) {
    res.send({ auth: false, message: "User does not exist" });
    return;
  }

  const admin = await User.findById(user._id).populate("equipo");

  res.send(admin);
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

/*
//* RUTA UPDATE

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
