import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to control showing or hiding the password
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (!email || !password) {
      alert("Please enter email and password.");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/loginAPI/adminLogin ",
          { email, password }
        );

        if (response.data === "Login Successful") {
          alert("Login Successful");
          sessionStorage.setItem("email", email);
          localStorage.setItem("email", email);
          navigate("/home"); // Navigate to "/result" page
        } else {
          alert(response.data);
          window.location.reload();
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="mybackground2">
      <div className="wrapper2">
        <legend id="title">Admin Login</legend>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="pade1">
            Email:
            <input
              type="email"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <br />
          <div className="padp">
            Password:
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="password-toggle">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>
          <br />
          <div id="login">
            <button type="submit" className="but1">
              Login
            </button>
            <span className="for">
              <Link to="/forgot">Forgot Password</Link>
            </span>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Login;
