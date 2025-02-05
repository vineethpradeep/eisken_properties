import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  return currentUser ? (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default Layout;
export { ProtectedLayout };
