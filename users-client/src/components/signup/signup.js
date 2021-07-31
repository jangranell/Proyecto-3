import React from "react";
import { Link, Redirect, } from "react-router-dom";
import "./signup.css";
const useState = React.useState;

const Signup = () => {
  let [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    role: "",
  });
  /* if (user.role !== "Admin") {
    const redirect = async () => {
      history.push("/session");
    };
  } */
  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    postSignUp();
  };

  const postSignUp = async () => {
    let inputNombre = document.getElementById("nombreInput").value;
    console.log(inputNombre);
    let inputApellido = document.getElementById("apellidoInput").value;
    console.log(inputApellido);
    let inputDni = document.getElementById("dniInput").value;
    console.log(inputDni);
    if (document.getElementById("r1").checked) {
      let inputRolIf = document.getElementById("r1").value;
      window.localStorage.NewRole = inputRolIf;
      console.log(inputRolIf);
    } else if (document.getElementById("r2").checked) {
      let inputRolIf = document.getElementById("r2").value;
      console.log(inputRolIf);
    } else if (document.getElementById("r3").checked) {
      let inputRolIf = document.getElementById("r3").value;
      console.log(inputRolIf);
    } else {
      console.log("No one selected");
      alert(
        `Role is not selected, please select new user's role.\nThis form will be reloaded.`
      );
      document.location.reload();
    }
    console.log("hasta aqui si antes");
    console.log(window.localStorage.NewRole);
    console.log("hasta aqui si");
    let inputRol = window.localStorage.NewRole;
    console.log("hasta aqui si 53");

    let inputInfo = {
      nombre: inputNombre,
      apellido: inputApellido,
      dni: inputDni,
      role: inputRol,
    };
    let responseFromServer = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: inputInfo.nombre,
        apellido: inputInfo.apellido,
        dni: inputInfo.dni,
        role: inputInfo.role,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    console.log(responseFromServer);
    console.log(
      "Nombre: " +
        inputNombre +
        "/" +
        "Apellido: " +
        inputApellido +
        "/" +
        "Dni: " +
        inputDni +
        "/" +
        "Rol: " +
        inputRol
    );
  };

  return (
    <div>
      <form
        className="border-2 text-center border-grey-200 width-200"
        onSubmit={handleFormSubmit}
      >
        <Link className="text-green-800 underline text-lg font-semibold" to="/">
          HOME
        </Link>
        <fieldset>
          <legend className="pb-8 text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-500 font-bold">
            {" "}
            Sign In{" "}
          </legend>
          <label className="text-3xl p-2 font-semibold">Nombre: </label>
          <input
            className="placeholder-gray-500"
            type="text"
            name="nombre"
            id="nombreInput"
            required
          />
          <br /> <br />
          <label className="text-3xl p-2 font-semibold">Apellido: </label>
          <input
            className="placeholder-gray-500"
            type="text"
            name="apellido"
            id="apellidoInput"
            required
          />
          <br /> <br />
          <label className="text-3xl p-2 font-semibold">DNI: </label>
          <input
            className="placeholder-gray-500"
            type="text"
            name="dni"
            id="dniInput"
            required
          />
          <br /> <br />
          <label className="text-3xl p-2 font-semibold">Role:</label>
          <input
            className="text-lg mx-8 p-2 font-semibold"
            type="radio"
            value="User"
            name="role"
            id="r1"
          />
          User
          <input
            className="text-lg mx-8 p-2 font-semibold"
            type="radio"
            value="Boss"
            name="role"
            id="r2"
          />
          Boss
          <input
            className="text-lg mx-8 p-2 font-semibold"
            type="radio"
            value="Admin"
            name="role"
            id="r3"
          />
          Admin
          <br /> <br />
          <input
            className="font-semibold text-lg p-2 mb-4"
            type="submit"
            value="Submit"
          />
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
