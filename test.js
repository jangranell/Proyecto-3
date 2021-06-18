<<<<<<< HEAD
require("dotenv").config();
console.log(process.env.USUARIO_BD);

const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Servidor Arrancado")
=======
require("dotenv").config();
console.log(process.env.USUARIO_BD);

const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Servidor Arrancado")
>>>>>>> a23d84d86b15e3785f68334973c12e900dadb6de
} );