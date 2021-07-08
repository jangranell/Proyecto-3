import {Link} from "react-router-dom";
import "./home.css";

const Home = () => {
    return (
        <div>
            <h1 className="home-container">Home</h1>
            <Link to="/login">Log In</Link>
            <br />
            <br />
            <Link to="/signup">Sign Up</Link>
        </div>
    );
};
export default Home;