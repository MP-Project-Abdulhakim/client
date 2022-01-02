import React from 'react'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Signup from "../Signup";
import Login from "../Login";
import Logout from "../Logout";
import Like from "../Like";
import MyProfile from "../MyProfile";


const Header = () => {
      const navigate = useNavigate();

    return (
      <div>
        <Logout />
        <button onClick={() => navigate("/login")}>go to login</button>
        <button onClick={() => navigate("/signup")}>go to signup</button>
        <button onClick={() => navigate("/like")}>go to like</button>
        <button onClick={() => navigate("/myprofile")}>go to My profile</button>

        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/like" element={<Like />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
        </Routes>
      </div>
    );
}

export default Header
