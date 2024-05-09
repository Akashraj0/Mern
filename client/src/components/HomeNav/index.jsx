import { Link } from "react-router-dom";
import "./index.scss";
import { useUser } from "../UserContext";
// import Cookies from "js-cookie";

const HomeNav = () => {
  const handleClick = () => {
    logout();
    // Cookies.remove("jwt");
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const { logout, user } = useUser();
  console.log(user);
  return (
    <div className="nav">
      <nav>
        <div className="first">
          {/* <img src={Logo} style={{ width: "5%" }} /> */}
        </div>
        <div className="second">
          <Link to="/home">Home</Link>
          <Link to="/post">Post</Link>
          <Link to="/question">Questions</Link>
        </div>
        <div className="third">
          <Link
            onClick={() => {
              handleClick();
            }}
          >
            LogOut
          </Link>
          <Link to="/profile">Account</Link>
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
