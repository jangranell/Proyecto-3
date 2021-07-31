import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link to="/login">Log In</Link>
      <br />
      <br />
      <Link to="/signup">Sign Up</Link>
      <br />
      <br />
      <Link to="/session">Session</Link>
      <br />
    </div>
  );
};
export default Home;
