import { Link, useHistory, useParams } from "react-router-dom";
import React from "react";
const { useState, useEffect } = React;

const Trabajador = () => {
  let [info, setInfo] = useState({
    loading: true,
    informacion: {},
    auth: false,
    message: "Cargando",
    id: useParams().id,
  });
  console.log(useParams());

  const getWorker = async () => {
    let responseFromGet = await fetch(
      `http://localhost:3001/trabajador/${info.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: window.localStorage.token,
          Role: window.localStorage.Role,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    if (responseFromGet.auth === true) {
      setInfo({
        ...info,
        informacion: responseFromGet.trabajador,
        auth: responseFromGet.auth,
        loading: false,
      });
    } else if (responseFromGet.auth === false) {
      setInfo({
        loading: false,
        auth: responseFromGet.auth,
      });
    }
    console.log(responseFromGet);
    /*if (responseFromGet.auth === true) {
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
    } */
  };

  useEffect(() => {
    getWorker();
  }, []);
  if (info.loading === true) {
    return (
      <div>
        <h1>Cargando... 99%</h1>
      </div>
    );
  } else if (info.loading === false) {
    if (info.auth === true) {
      return (
        <div>
          <h1 className="home-container">
            {info.informacion.role} {info.informacion.nombre}
          </h1>
          <h2>Sus Entradas:</h2>
          <table className="tableentrada">
            <tbody>
              {info.informacion.dias.map((entrada, index) => {
                return (
                  <tr key={`entrada-container-${entrada._id}`}>
                    <td key={`entrada-fecha-${entrada._id}`}>
                      <strong>{`Entrada Nº:  ` + (index + 1)}</strong> -{" "}
                      {entrada.fecha} -- {entrada.horaEntrada} --{" "}
                      {entrada.horaSalida}{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
          <Link to="/session">Atrás</Link>
        </div>
      );
    } else if (info.auth === false) {
      return (
        <div>
          <h1>LARGO!!</h1>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    }
  }
};
export default Trabajador;
