import { Switch, Route } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/forms/login";
import Signup from "./components/signup/signup";
import Session from "./components/session/session";
import Trabajador from "./components/trabajador/trabajador";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home></Home>;
          }}
        />
        <Route
          exact
          path="/login"
          render={() => {
            return <Login></Login>;
          }}
        />
        <Route
          exact
          path="/signup"
          render={() => {
            return <Signup></Signup>;
          }}
        />
        <Route
          exact
          path="/session"
          render={() => {
            return <Session></Session>;
          }}
        />
        <Route
          exact
          path="/trabajador/:id"
          render={() => {
            return <Trabajador></Trabajador>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
