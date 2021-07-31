import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./admin.css";
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
          <h1 className="pb-8 text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-300 font-bold">{`Bienvenido ADMIN ,`}</h1>
          <h2 className="text-2xl text-center">Tus Trabajadores:</h2>
          <br></br>
          <table className="text-xl mx-auto ">
            <tbody className="text-center">
              {info.informacion.map((trabajador, index) => {
                return (
                  <tr className="border border-green-500" key={trabajador._id}>
                    <td>{trabajador.nombre}</td> <td>({trabajador.role})</td> -
                    <td>
                      <Link
                        className="text-green-600 underline"
                        to={`/trabajador/${trabajador._id}`}
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
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
