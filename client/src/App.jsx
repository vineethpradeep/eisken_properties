import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import { Suspense, lazy } from "react";

// const Footer = lazy(() => import("./components/footer/Footer"));
// const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const HomePage = lazy(() => import("./routes/homePage/HomePage"));
const PropertiesList = lazy(() =>
  import("./routes/propertiesList/PropertiesList")
);
const Layout = lazy(() => import("./routes/layout/Layout"));
const ProtectedLayout = lazy(() => import("./routes/layout/Layout"));
const PropertyDetails = lazy(() =>
  import("./routes/propertyDetails/PropertyDetails")
);
const Login = lazy(() => import("./routes/login/Login"));
const ProfilePage = lazy(() => import("./routes/profilePage/ProfilePage"));
const Register = lazy(() => import("./routes/register/register"));
const NewPostPage = lazy(() => import("./routes/newPostPage/NewPostPage"));

import {
  profilePageLoader,
  propertiesListLoader,
  propertyDetailsLoader,
} from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading Layout...</div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading HomePage...</div>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/properties",
          element: (
            <Suspense fallback={<div>Loading Properties...</div>}>
              <PropertiesList />
            </Suspense>
          ),
          loader: propertiesListLoader,
        },
        {
          path: "/properties/:id",
          element: (
            <Suspense fallback={<div>Loading Property Details...</div>}>
              <PropertyDetails />
            </Suspense>
          ),
          loader: propertyDetailsLoader,
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense fallback={<div>Loading Register...</div>}>
              <Register />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading Protected Layout...</div>}>
          <ProtectedLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/profile",
          element: (
            <Suspense fallback={<div>Loading Profile...</div>}>
              <ProfilePage />
            </Suspense>
          ),
          loader: profilePageLoader,
        },
        {
          path: "/add",
          element: (
            <Suspense fallback={<div>Loading New Post Page...</div>}>
              <NewPostPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
