import React, { useState } from "react";
import "./Forgot.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/loginAPI/adminLogin/${email}`, {
        email,
        password,
      });
      console.log("Data updated successfully:", response.data);
      setSuccess(true);
    } catch (error) {
      setError("Failed to reset password");
    }
  };

  return (
    <div className="mybackground2">
      <div className="wrapper3">
        <legend id="title2">Forgot Password</legend>
        <br />
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="pade">
              Email:
              <input
                type="email"
                placeholder="Enter Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="padn">
              New Password:
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="padc">
              Confirm Password:
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <br />
            <div>
              <button type="submit" class="but6">Submit</button>
              <Link to="/login">Back to Login</Link>
            </div>
          </form>
        ) : (
          <div>
            <p>Password reset successfully!</p>
            <Link to="/login">Back to Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forgot;


