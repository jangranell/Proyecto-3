import "./session.css";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Admin from "../admin/admin.js";
import nopeGif from "../../img/nope.gif"
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
  //!
  //TODO: ACTUALIZAR ENTRADA && BORRAR ENTRADA
  //!
  const ActuBut = async () => {};

  const BorrarBut = async () => {};

  if (info.load === false) {
    return (
      <div>
        <h1>Cargando... 99%</h1>
        <br></br>
        <Link to="/">HOME</Link>
      </div>
    );
  } else if (info.load === true && info.auth === true) {
    if (window.localStorage.Role === "User") {
      return (
        <div>
          <header className="heade">
            <button className="botLogOut" onClick={LogOutBut}>
              LOG out
            </button>
            <button className="botFichar" onClick={getDate}>
              FICHAR
            </button>
          </header>
          <h1>{`Bienvenido ${info.nombre} ${info.apellido},`}</h1>
          <h2>Tus Entradas:</h2>
          <table className="tableentrada">
            <tbody>
              {info.dias.map((entrada, index) => {
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
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (window.localStorage.Role === "Boss") {
      {
        console.log(info.role);
      }
      return (
        <div>
          <header className="heade">
            <button className="botLogOut" onClick={LogOutBut}>
              LOG out
            </button>
            <button className="botFichar" onClick={getDate}>
              FICHAR
            </button>
          </header>
          <h1>{`Bienvenido ${info.role} ${info.nombre} ${info.apellido},`}</h1>
          <h2>Tus Entradas:</h2>
          <table className="tableentrada">
            <tbody>
              {info.dias.map((entrada, index) => {
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
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (info.role === "Admin") {
      {
        console.log(info.role);
      }
      return (
        <div>
          <header className="heade">
            <button className="botLogOut" onClick={LogOutBut}>
              LOG out
            </button>
            <button className="botFichar" onClick={getDate}>
              FICHAR
            </button>
          </header>
          <Admin></Admin>
        </div>
      );
    }
  } else if (info.auth === false) {
    return (
      <div>
        <h2>{info.message}</h2>
        <img src={nopeGif} width="480" height="277" alt="nope"></img>
        <br></br>
        <Link to="/">HOME</Link>
      </div>
    );
  }
};

export default Session;
