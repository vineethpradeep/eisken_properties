import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
// import Footer from "./components/footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import HomePage from "./routes/homePage/HomePage";
import PropertiesList from "./routes/propertiesList/PropertiesList";
import Layout, { ProtectedLayout } from "./routes/layout/Layout";
import PropertyDetails from "./routes/propertyDetails/PropertyDetails";
import Login from "./routes/login/Login";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/register";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import {
  profilePageLoader,
  propertiesListLoader,
  propertyDetailsLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/properties",
          element: <PropertiesList />,
          loader: propertiesListLoader,
        },
        {
          path: "/properties/:id",
          element: <PropertyDetails />,
          loader: propertyDetailsLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <ProtectedLayout />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        { path: "/add", element: <NewPostPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
