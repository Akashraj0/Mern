import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Posts";
import axios from "axios";
import { UserProvider } from "./components/UserContext";
axios.defaults.baseURL = "http://localhost:8000/api/v1/";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <UserProvider>
        <Routes>
          <Route index path="/home" element={<Login />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
