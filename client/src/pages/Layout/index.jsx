import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
export const Layout = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/home";
  if (isLoginPage) {
    return (
      <div className="App">
        <Outlet />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Sidebar />
        <div className="page">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default Layout;
