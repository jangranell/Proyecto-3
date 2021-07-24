import { Link, useHistory } from "react-router-dom";
import React from "react";
const { useState, useEffect } = React;

const Admin = () => {
  let [info, setInfo] = useState({
    loading: true,
    informacion: [],
    auth: false,
    message: "Cargando",
  });
  const getUser = async () => {
    let responseFromGet = await fetch("http://localhost:3001/admin", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
        Role: window.localStorage.Role,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });

    console.log(responseFromGet);
    if (responseFromGet.auth === true) {
      setInfo({
        loading: false,
        informacion: responseFromGet.usuariosFiltrados,
        auth: true,
      });
      let trabajadores = responseFromGet.usuariosFiltrados;
      console.log(trabajadores);
    } else if (responseFromGet.auth === false) {
      setInfo({
        loading: false,
        auth: false,
        message: "VETE DE AQUÍ, FORASTERO!!",
      });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (info.loading === true) {
    return (
      <div>
        <h1>Cargando... 99%</h1>
        <br></br>
        <Link to="/">HOME</Link>
      </div>
    );
  } else if (info.loading === false) {
    if (info.auth === false) {
      return (
        <div>
          <h2>{info.message}</h2>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (info.auth === true) {
      return (
        <div>
          <h1>{`Bienvenido ADMIN,`}</h1>
          <h2>Tus Trabajadores:</h2>
          <table className="tableentrada">
            <tbody>
              {info.informacion.map((trabajador, index) => {
                return (
                  <tr key={trabajador._id}>
                    <td>{trabajador.nombre}</td> / <td>{trabajador.role}</td> //{" "}
                    <td>
                      <Link to={`/trabajador/${trabajador._id}`}>Detail</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    }
  }
  return (
    <div>
      {console.log(info)}
      <h1 className="home-container">ADMIN</h1>
    </div>
  );
};
export default Admin;
