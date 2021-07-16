import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./login.css";
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
      <Link to="/">HOME</Link>
      <fieldset>
        <legend> Log In </legend>
        <form onSubmit={handleFormSubmit}>
          <label>Nombre: </label>
          <input type="text" name="nombre" onChange={handleChange} />
          <br /> <br />
          <label>DNI: </label>
          <input type="text" name="dni" onChange={handleChange} />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
