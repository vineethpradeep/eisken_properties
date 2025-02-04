import "./registerUser.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupImage from "../../images/svg/signup_welcome.svg";
import apiRequest from "../../lib/apiRequest";

const RegisterUser = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        isAdmin: false,
      });

      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper-register">
      <div className="register">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Create an Account</h1>
            <input
              name="username"
              type="text"
              placeholder="Username"
              required
            />
            <input name="email" type="text" placeholder="Email" required />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
            <button disabled={isLoading}>Register</button>
            {error && <span>{error}</span>}
            <Link to="/login">Do you have an account?</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src={SignupImage} alt="Security Login" />
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
