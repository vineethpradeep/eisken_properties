import "./login.scss";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../../lib/firebase.js";
import SecurityLoginImage from "../../images/svg/security_login.svg";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/button/Button";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      // console.log(res.data);
      updateUser(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user details to the backend for login/register
      const res = await apiRequest.post("/auth/google-login", {
        accessToken: user.accessToken,
        username: user.displayName,
        email: user.email,
        googleId: user.uid, // Send UID instead of password
        avatar: user.photoURL,
      });

      console.log("Login successful:", res.data);
      updateUser(res.data); // Update user context
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error("Google login error:", error.message);
      setError("Google login failed, please try again.");
    }
  };

  return (
    <div className="wrapper-login">
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Eiesken Properties Welcomes You</h1>
            <span className="caption">
              Employees, log in | Users, sign in with Google!
            </span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
              minLength={3}
              maxLength={10}
            />
            <div className="password-container">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                className="toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </div>
            <div className="signInBtn">
              <Button variant={"secondary"} onClick={handleGoogleLogin}>
                <FaGoogle />
                Sign in with Google
              </Button>
              <Button variant={"primary"} type="submit" disabled={isLoading}>
                Login
              </Button>
            </div>
            {error && <span>{error}</span>}
            {/* {<Link to="/register">{"Don't"} you have an account?</Link>} */}
          </form>
        </div>
        <div className="imgContainer">
          <img src={SecurityLoginImage} alt="Security Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
