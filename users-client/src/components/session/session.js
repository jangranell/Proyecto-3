import "./session.css";
import React from "react";
import { Link } from "react-router-dom";
const { useState, useEffect } = React;

const Session = () => {
  let [info, setInfo] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    dias: [],
    load: false,
  });
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
    let information = {
      nombre: responseFromGet.nombre,
      apellido: responseFromGet.apellido,
      dni: responseFromGet.dni,
      role: responseFromGet.role,
      dias: responseFromGet.dias,
      load: true,
    };
    return information;
  };
  const getDate = async (userInfo) => {
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
    console.log(hora + " - " + fecha);

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
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      });
    let array = [];
    responseFromPost.dias.forEach((element) => {
      array.push(element);
    });

    setInfo({
      dias: array,
      load: true,
      nombre: userInfo.nombre,
      apellido: userInfo.apellido,
      dni: userInfo.dni,
      role: userInfo.role,
    });
  };

  useEffect(async () => {
    let userInformation = await getUser();
    getDate(userInformation);
  }, []);

  let entradas = info.dias;
  console.log(entradas);
  console.log(info.dias[0]);

  if (info.load === false) {
    return (
      <div>
        <h1>Cargando... 99%</h1>
        <br></br>
        <Link to="/">HOME</Link>
      </div>
    );
  } else if (info.load === true) {
    if (window.localStorage.Role === "User") {
      return (
        <div>
          <header>
            <button className="botLogOut">LOG out</button>
          </header>
          <p>{`Bienvenido ${info.role} ${info.nombre} ${info.apellido},`}</p>
          <br></br>
          <table className="tableentrada">
            <tbody>
              {info.dias.map((entrada) => {
                return (
                  <tr key={`entrada-container-${entrada._id}`}>
                    <td key={`entrada-fecha-${entrada._id}`}>
                      {entrada.fecha} -- {entrada.horaEntrada} --{" "}
                      {entrada.horaSalida}
                    </td>
                  </tr>
                );
              })}
              ;
            </tbody>{" "}
          </table>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (window.localStorage.Role === "Boss") {
      return (
        <div>
          <header>
            <button className="botLogOut">LOG out</button>
          </header>
          <p>{`Bienvenido ${info.role} ${info.nombre} ${info.apellido},`}</p>
          <br></br>
          <table className="tableentrada">
            <tbody>
              {info.dias.map((entrada) => {
                return (
                  <tr key={`entrada-container-${entrada._id}`}>
                    <td key={`entrada-fecha-${entrada._id}`}>
                      {entrada.fecha} -- {entrada.horaEntrada} --{" "}
                      {entrada.horaSalida}
                    </td>
                  </tr>
                );
              })}
              ;
            </tbody>{" "}
          </table>
          <br></br>
          <Link to="/">HOME</Link>
        </div>
      );
    } else if (info.role === "Admin") {
      return (
        <div>
          <header>
            <button className="botLogOut">LOG out</button>
          </header>
          {console.log(info.dias)}
          <p>{`Bienvenido ${info.role} ${info.nombre} ${info.apellido},`}</p>
          <br></br>
          <p>Tus Entradas:</p>
          <table class="tableentrada">
            <tbody>
              {info.dias.map((entrada) => {
                return (
                  <tr key={`entrada-container-${entrada._id}`}>
                    <td key={`entrada-fecha-${entrada._id}`}>
                      {entrada.fecha} -- {entrada.horaEntrada} --{" "}
                      {entrada.horaSalida}
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
};

export default Session;
