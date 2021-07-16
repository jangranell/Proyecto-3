/*

Si  ejecutamos: "http://localhost:3000/nuevaReceta" en POSTMAN, ;  
Sube a MongoDB el Body (RAW => JSON)

////////

Si  ejecutamos: "node app.js" ;  
Sube a MongoDB el Body (RAW => JSON) // W I P


*/

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Usuario");
const auth = require("./routes/authentication");

const app = express();

const port = 3001;

mongoose
  .connect(
    `mongodb+srv://JanGranell:123456789Mongo@cluster0.gsl6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Ya estamos conectados a la base de datos.");
  })
  .catch((error) => {
    console.log(error);
  });

/* var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};


*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", auth);
/*
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

  let workers = await User.find().then((foundUser) => {
    return foundUser;
  });
  res.send(workers);  
});

// rutas ADMIN
app.get("/admin/:id", async (req, res) => {
  let id = req.params.id;
  let workers = await User.find().then((foundUser) => {
    return foundUser;
  });
  res.send(workers);  
});
*/
app.listen(port, () => {
  console.log(`Servidor a la escucha en el puerto 3001.`);
});
