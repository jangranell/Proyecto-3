/* import "./session.css"; */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Admin from "../admin/admin.js";
import nopeGif from "../../img/nope.gif";
import FarmaciaLogo from "../../img/logotipo alta calidad.jpg";
const { useState, useEffect } = React;

const Session = () => {
  let [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    dias: [],
    horaEntrada: "",
    load: false,
    auth: false,
    message: "",
  });

  let history = useHistory();

  const getUser = async () => {
    let responseFromGet = await fetch("http://localhost:3001/private", {
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

    let information = {};
    if (responseFromGet.auth !== false) {
      setInfo({
        ...info,
        nombre: responseFromGet.user.nombre,
        apellido: responseFromGet.user.apellido,
        dni: responseFromGet.user.dni,
        role: responseFromGet.user.role,
        dias: responseFromGet.user.dias,
        load: true,
        auth: responseFromGet.auth,
        message: responseFromGet.message,
      });
    } else {
      setInfo({
        ...info,
        load: true,
        auth: responseFromGet.auth,
        message: responseFromGet.message,
      });
    }
  };
  const getDate = async () => {
    let date = new Date();
    let minutos = date.getMinutes();
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    let horas = date.getHours();
    if (horas < 10) {
      horas = "0" + horas;
    }
    let dia = date.getDate();
    if (dia < 10) {
      dia = "0" + dia;
    }
    let mes = date.getMonth() + 1;
    if (mes < 10) {
      mes = "0" + mes;
    }
    let fecha = `${dia}/${mes}/${date.getFullYear()}`;
    let hora = `${horas}:${minutos}`;

    let responseFromPost = await fetch("http://localhost:3001/entrada", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
      body: JSON.stringify({
        fecha: fecha,
        horaEntrada: hora,
        horaSalida: "",
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    //console.log(responseFromPost.dias[responseFromPost.dias.length - 1]);
    console.log(responseFromPost.dias);
    setInfo({
      dias: responseFromPost.dias,
      load: true,
      nombre: responseFromPost.nombre,
      apellido: responseFromPost.apellido,
      dni: responseFromPost.dni,
      role: responseFromPost.role,
      horaEntrada: hora,
      auth: true,
    });
  };

  useEffect(async () => {
    getUser();
  }, []);

  const LogOutBut = async () => {
    let date = new Date();
    let minutos = date.getMinutes();
    if (minutos < 10) {
      minutos = "0" + minutos;
    }
    let horas = date.getHours();
    if (horas < 10) {
      horas = "0" + horas;
    }
    let dia = date.getDate();
    if (dia < 10) {
      dia = "0" + dia;
    }
    let mes = date.getMonth() + 1;
    if (mes < 10) {
      mes = "0" + mes;
    }
    let fecha = `${dia}/${mes}/${date.getFullYear()}`;
    let hora = `${horas}:${minutos}`;
    console.log(info.dias[info.dias.length - 1]);
    let idDia = info.dias[info.dias.length - 1]._id;
    console.log(idDia);
    let logOutFunc = await fetch(`http://localhost:3001/salida/${idDia}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: window.localStorage.token,
      },
      body: JSON.stringify({
        fecha: fecha,
        horaEntrada: info.horaEntrada,
        horaSalida: hora,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    window.localStorage.clear();
    console.log(logOutFunc);
    history.push("/login");
  };
  if (info.load === false) {
    return (
      <div>
        <h1 className="pb-8 text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-700 font-bold">
          Cargando... 99%
        </h1>
        <br></br>
        <Link to="/">HOME</Link>
      </div>
    );
  } else if (info.load === true && info.auth === true) {
    if (window.localStorage.Role === "User") {
      return (
        <div>
          <header className="heade grid grid-cols-2 divide-x divide-gray-100 text-gray-200 ">
            <button
              className="text-xl  text-red-700 underline"
              onClick={LogOutBut}
            >
              LOG out
            </button>
            <button
              className="text-xl text-green-700 underline"
              onClick={getDate}
            >
              FICHAR
            </button>
          </header>
          <br></br>
          <h1 className="text-3xl font-bold">{`Bienvenido ${info.nombre} ${info.apellido},`}</h1>
          <h2 className="text-2xl font-semibold">Tus Entradas:</h2>
          <br></br>
          <table className="text-lg	">
            <tbody>
              {info.dias.map((entrada, index) => {
                return (
                  <tr
                    className="border border-green-500"
                    key={`entrada-container-${entrada._id}`}
                  >
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
          <Link
            className="text-green-800 underline text-lg font-semibold"
            to="/"
          >
            HOME
          </Link>
        </div>
      );
    } else if (window.localStorage.Role === "Boss") {
      {
        console.log(info.role);
      }
      return (
        <div>
          <header className="heade">
            <button className="bg-red-500 hover:bg-red-700" onClick={LogOutBut}>
              LOG out
            </button>
            <button onClick={getDate}>FICHAR</button>
          </header>
          <h1>{`Bienvenido ${info.role} ${info.nombre} ${info.apellido},`}</h1>
          <h2>Tus Entradas:</h2>
          <div className="border-4 border-green-600">
            <table className="">
              <tbody>
                {info.dias.map((entrada, index) => {
                  return (
                    <tr className="" key={`entrada-container-${entrada._id}`}>
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
          </div>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (info.role === "Admin") {
      {
        console.log(info.role);
      }
      return (
        <div>
          <nav className="heade grid grid-cols-2 divide-x divide-gray-100 text-gray-200 ">
            <button
              className="text-xl  text-red-700 underline "
              onClick={LogOutBut}
            >
              LOG out
            </button>
            <button>
              <Link className="text-xl text-green-700 underline" to="/signup">
                Sign In
              </Link>
            </button>
          </nav>
          <Admin></Admin>
        </div>
      );
    }
  } else if (info.auth === false) {
    return (
      <div>
        <h1 className="pb-8 text-5xl text-center bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-600 font-bold">
          Usuario Desconocido
        </h1>
        <h2>{info.message}</h2>
        <img src={nopeGif} width="480" height="277" alt="nope"></img>
        <br></br>{" "}
        <Link className="text-xl text-purple-800 underline" to="/login">
          Atrás
        </Link>
      </div>
    );
  }
};

export default Session;
