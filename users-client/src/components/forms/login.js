import React from "react";
import { Link } from "react-router-dom";
const useState = React.useState;

const Login = () => {
  let [info, setInfo] = useState({
    nombre: "",
    dni: "",
  });

  const handleChange = (event) => {
    setInfo({
      ...info,
      [event.target.name]: event.target.value,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(postLogin);
    postLogin();
    console.log("FUNCIONA");
  };

  const postLogin = async () => {
    let inputInfo = {
      nombre: info.nombre,
      dni: info.dni,
    };
    let responseFromPost = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: inputInfo.nombre,
        dni: inputInfo.dni,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    console.log(responseFromPost);
  };

  return (
    <div>
      {console.log(info)}
      <Link to="/">HOME</Link>
      <fieldset>
        <legend> Log In</legend>
        <form onSubmit={handleFormSubmit}>
          <label>Nombre: </label>
          <input type="text" name="nombre" onChange={handleChange} />
          <br /> <br />
          <label>DNI: </label>
          <input type="text" name="dni" onChange={handleChange} />
          <br />
          <br />
          <input type="submit" value="Submit"/>
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
