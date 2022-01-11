import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Aboutus from "./Components/Aboutus";
import Recipe from "./Components/Recipe";
import Active from "./Components/active";
import Chefpostes from "./Components/Chefpostes";
import Profile from "./Components/Profile";
import Download from "./Components/Download";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Like from "./Components/Like";
import Follow from "./Components/Follow";
import MyProfile from "./Components/MyProfile";
import "./App.css";
import Nav from "./Components/Nav";


function App() {
  return (
    <div>
      <Nav />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/aboutus" element={<Aboutus />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/like" element={<Like />} />
          <Route exact path="/follow" element={<Follow />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
          <Route exact path="/Profile/:id" element={<Profile />} />
          <Route exact path="/Recipe/:id" element={<Recipe />} />
          <Route exact path="/active/:id" element={<Active />} />
          <Route exact path="/Chefpostes/:id" element={<Chefpostes />} />
          <Route exact path="/add_recipe" element={<Download />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
