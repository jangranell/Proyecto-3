/*

Si  ejecutamos: "http://localhost:3000/nuevaReceta" en POSTMAN, ;  
Sube a MongoDB el Body (RAW => JSON)

////////

Si  ejecutamos: "node app.js" ;  
Sube a MongoDB el Body (RAW => JSON) // W I P


*/
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const usuarios = require("./models/Usuario");

const app = express();

const User = require("./models/Usuario");

const port = 3000;

mongoose
  .connect(
    `mongodb+srv://JanGranell:123456789Mongo@cluster0.gsl6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Estamos conectados a la base de datos.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// rutas TRABAJADOR
app.get("/home/:id", async (req, res) => {
  let id = req.params.id;
  let worker = await User.findById(id).then((foundUser) => {
    return foundUser;
  });
  res.send(worker); 
});

// rutas JEFE
app.get("/boss/:id", async (req, res) => {
  let id = req.params.id;
  let boss = await User.findById(id).then((foundUser) => {
    for (let i = 0; i < usuarios.length; i++) {
      return User[i];
    };
  });
  res.send(worker); 
});

// rutas ADMIN
app.get("/admin/:id", async (req, res) => {
  let id = req.params.id;
  let admin = await User.findById(id).then((foundUser) => {
    for (let i = 0; i < usuarios.length; i++) {
      return User[i];
    };
  });
  res.send(worker); 
});

app.listen(3000, () => {
  console.log(`Servidor a la escucha en el puerto 3000.`);
});
