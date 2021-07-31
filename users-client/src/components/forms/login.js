//!
//TODO:
//1. CRUD -> Delete and Update Entradas
//2. Diseño
//3. Props ?
//TODO:
//!
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./login.css";
import FarmaciaLogoLargo from "../../img/logotipo alargado alta calidad.jpg";
const useState = React.useState;

const Login = () => {
  let [info, setInfo] = useState({
    nombre: "",
    dni: "",
  });

  let history = useHistory();

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //Save User Token in localStorage
    let myToken = await postLogin();
    saveToken(myToken);
    // Save User Role in localStorage
    let myRole = await postLogin2();
    saveRole(myRole);
    redirect();
  };

  const postLogin = async () => {
    let responseFromPost = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: info.nombre,
        dni: info.dni,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    return responseFromPost.token;
  };
  const postLogin2 = async () => {
    let responseFromPost = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: info.nombre,
        dni: info.dni,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    return responseFromPost.Role;
  };

  const saveToken = (tokenElement) => {
    window.localStorage.setItem("token", tokenElement);
  };
  const saveRole = (roleElement) => {
    window.localStorage.setItem("Role", roleElement);
  };

  const redirect = async () => {
    history.push("/session");
  };

  return (
    <div>
      <fieldset className="mx-96">
        <h1 className="pb-8 text-7xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-300 font-bold">
          {" "}
          Log In{" "}
        </h1>
        <form
          className="border-2 text-center  border-grey-200 width-200"
          onSubmit={handleFormSubmit}
        >
          <label className="text-3xl p-2 font-semibold">Nombre: </label>
          <input
            className=""
            type="text"
            name="nombre"
            className="placeholder-gray-500"
            placeholder="Usuario"
            onChange={handleChange}
          />
          <br /> <br />
          <label className="text-3xl p-2 font-semibold">DNI: </label>
          <input
            className=""
            type="text"
            name="dni"
            className="placeholder-gray-500"
            placeholder="12345678A"
            onChange={handleChange}
          />
          <br />
          <br />
          <input
            className="font-semibold p-2 mb-4"
            type="submit"
            value="Submit"
          />
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
