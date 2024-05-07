import { useState } from "react";
import axios from "axios";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../components/UserContext";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const result = await axios.post("users/login", {
      email,
      password,
    });
    console.log(result);
    console.log(result?.data?.data);
    login(result?.data?.data);
    navigate("/post");
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <form
        className={isLogin ? "active" : ""}
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          required
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <button type="submit">Login</button>
      </form>
      <form className={!isLogin ? "active" : ""}>
        <h2>Signup</h2>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Signup</button>
      </form>
      <div className="switch">
        <input
          type="checkbox"
          id="switch-toggle"
          onChange={handleSwitch}
          checked={isLogin}
        />
        <label htmlFor="switch-toggle" className="switch-label"></label>
      </div>
    </div>
  );
};

export default Login;
