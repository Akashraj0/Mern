import { Link } from "react-router-dom";
// import Logo from "../../assets/Logo.jpg";
import "./index.scss";
const Home = () => {
  return (
    <div className="Home">
      <nav>
        <div className="logo">
          {/* <img src={Logo} style={{ width: "5%" }} /> */}
        </div>
        <div className="link">
          <ul>
            <li>Post</li>
            <li>Questions</li>
          </ul>
        </div>
        <div className="logout">
          <p>LogOut</p>
        </div>
      </nav>
      <div className="Container">
        <div className="box">
          <Link to="/post">Post</Link>
        </div>
        <div className="box">
          <Link to="/ques">Question</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
