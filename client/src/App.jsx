import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Posts";
import Home from "./pages/Home";
import axios from "axios";
import { UserProvider } from "./components/UserContext";
import QuestionForm from "./pages/Questions";
import HomeNav from "./components/HomeNav";
import Profile from "./pages/Profile";
axios.defaults.baseURL = "http://localhost:8000/api/v1/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="app">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/question" element={<QuestionForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homenav" element={<HomeNav />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
