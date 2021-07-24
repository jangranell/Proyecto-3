import {Link} from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <div>
            <h1 className="home-container">Home</h1>
            <Link to="/login" classname="linki">Log In</Link>
            <br />
            <br /> 
            <Link to="/signup" classname="linki">Sign Up</Link>
            <br /> 
            <br /> 
            <Link to="/session" classname="linki">Session</Link>
            <br /> 
            <Link to="/admin" classname="linki">ADMIN</Link>
        </div>
    );
};
export default Home;