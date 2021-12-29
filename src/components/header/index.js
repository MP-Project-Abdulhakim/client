import React from 'react'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup";
import Login from "../Login";
import Logout from "../Logout";


const Header = () => {
      const navigate = useNavigate();

    return (
      <div>
        <Logout />
        <button onClick={() => navigate("/login")}>go to login</button>
        <button onClick={() => navigate("/signup")}>go to signup</button>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    );
}

export default Header
