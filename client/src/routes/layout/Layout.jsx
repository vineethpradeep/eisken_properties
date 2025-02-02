import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./layout.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer";

function Layout() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function ProtectedLayout() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
export { ProtectedLayout };
