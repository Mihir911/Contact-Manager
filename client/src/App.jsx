import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

const token = localStorage.getItem("token");
const publicRoutes = ["/login", "/signup"];

if (!token && !publicRoutes.includes(window.location.pathname)) {
  window.location.replace("/login");
}

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
