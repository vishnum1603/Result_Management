import React from 'react';
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import './App.css';
import Login from "./Result_Management/Login" ;
import Forgot from "./Result_Management/Forgot" ;
import Marksheet from './Result_Management/Marksheet';
import LoginPage from './Result_Management/LoginPage';
import AdminLogin from './Result_Management/AdminLogin';
import Home from './Result_Management/Home';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="/studentlogin" element={<Login/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/result" element={<Marksheet/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
