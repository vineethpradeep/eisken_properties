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
const NewPostPage = lazy(() => import("./routes/newPostPage/NewPostPage"));
const RegisterPage = lazy(() => import("./routes/register/RegisterUser.jsx"));

import {
  profilePageLoader,
  propertiesListLoader,
  propertyDetailsLoader,
} from "./lib/loaders";
import ContactUs from "./routes/contactUs/ContactUs";
import AboutUs from "./routes/aboutUs/AboutUs";

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
          path: "/contact",
          element: (
            <Suspense fallback={<div>Loading Properties...</div>}>
              <ContactUs />
            </Suspense>
          ),
          loader: propertiesListLoader,
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<div>Loading Properties...</div>}>
              <AboutUs />
            </Suspense>
          ),
          loader: propertiesListLoader,
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
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
        {
          path: "/register",
          element: (
            <Suspense fallback={<div>Loading New Register Page...</div>}>
              <RegisterPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
