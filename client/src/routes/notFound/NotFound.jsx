import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
