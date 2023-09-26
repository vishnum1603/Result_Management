import React, { useState } from "react";
import './Signup.css' ;
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/signup', { firstName, lastName, email, password });
      localStorage.setItem('token', response.data.token); // Store token in local storage
      navigate('/result'); // Redirect to result page
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <>
      <div class="mybackground2">
        <div class="wrapper2">
          <legend id="title1">Signup</legend><br/>
          <form onSubmit={handleSubmit}>
            <div>
              First Name :<input type="text" placeholder='Enter Your First Name' value={firstName} onChange={(event) => setFirstName(event.target.value)} required/>
            </div><br/>
            <div>
              Last Name :<input type="text" placeholder='Enter Your Last Name' value={lastName} onChange={(event) => setLastName(event.target.value)} required/>
            </div><br/>
            <div class="pad">
              Email :<input type="email" placeholder='Enter Your Email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div><br/>
            <div>
              Password :<input type="password" placeholder='Enter Your Password' value={password} onChange={(event) => setPassword(event.target.value)} required/>
            </div><br/>
            <div id='signup'>
              <button type="submit">Signup</button>
            </div><br/> 
          </form>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Signup;
