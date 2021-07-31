import { Link, useHistory, useParams } from "react-router-dom";
import React from "react";
import "./trabajador.css";
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
  };

  const deleteFecha = async () => {
    let responseFromDel = await fetch("http://localhost:3001/admin", {
      method: "DELETE",
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
          <h1 className="text-3xl font-bold">
            {info.informacion.role} {info.informacion.nombre}
          </h1>
          <h2 className="text-2xl font-semibold">Sus Entradas:</h2>
          <br></br>
          <table className="text-lg">
            <tbody>
              {info.informacion.dias.map((entrada, index) => {
                return (
                  <tr
                    className="border border-green-500"
                    key={`entrada-container-${entrada._id}`}
                  >
                    <td key={`entrada-fecha-${entrada._id}`}>
                      <strong>{`Entrada Nº:  ` + (index + 1)}</strong> -{" "}
                      {entrada.fecha} -- {entrada.horaEntrada} --{" "}
                      {entrada.horaSalida}{" "}
                      <button className="border-2 border-yellow-600 text-xl text-yellow-400 underline p-1 m-2">
                        Modificar
                      </button>
                      <button className="border-2 border-red-600 text-xl text-red-700 underline p-1 m-2">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
          <Link
            className="text-green-800 underline text-lg font-semibold"
            to="/session"
          >
            Atrás
          </Link>
        </div>
      );
    } else if (info.auth === false) {
      return (
        <div>
          <h1 className="text-4xl text-red-800 font-bold">
            Fuera de Aquí, Forastero!!
          </h1>
          <br></br>
          <Link
            className="text-green-800 underline text-lg font-semibold"
            to="/"
          >
            HOME
          </Link>
        </div>
      );
    }
  }
};
export default Trabajador;
