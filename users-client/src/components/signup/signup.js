import React from "react";
import { Link } from "react-router-dom";
import "./signup.css";
const useState = React.useState;

const Signup = () => {
  let [info, setInfo] = useState({
    username: "",
    password: "",
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
    postSignIn();
  };

  const postSignIn = async () => {
    let inputInfo = {
      username: info.username,
      password: info.password,
    };
    let responseFromServer = await fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: inputInfo.username,
        password: inputInfo.password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    console.log(responseFromServer);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Link to="/">HOME</Link>
        <fieldset>
          <legend className="legendSign"> Sign In </legend>
          <form onSubmit={handleFormSubmit}>
            <label>Nombre: </label>
            <input type="text" name="nombre" onChange={handleChange} />
            <br /> <br />
            <label>Apellido: </label>
            <input type="text" name="apellido" onChange={handleChange} />
            <br /> <br />
            <label>DNI: </label>
            <input type="text" name="dni" onChange={handleChange} />
            <br /> <br />
            <label>Role:</label>
              <input type="radio" value="User" name="gender" /> User
              <input type="radio" value="Boss" name="gender" /> Boss
              <input type="radio" value="Admin" name="gender" /> Admin
           <br /> <br />
            
            <input type="submit" value="Submit" />
          </form>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
