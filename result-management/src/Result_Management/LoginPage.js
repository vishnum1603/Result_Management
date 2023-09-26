import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import img1 from "./admin1.png";
import img2 from "./admin2.png" ;

const LoginPage = () => {
  return (
    <div>
      <div className="mybackground2">
        <div className="wrapper2">
          <legend id="title">Login</legend>
          <div class="wrap">
            <Link to="/studentlogin"><a>USER</a><img id="img1" src={img1}/></Link> 
          </div>
          <div class="wrap">
            <Link to="/adminlogin"><a>ADMIN</a><img id="img2" src={img2}/></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
