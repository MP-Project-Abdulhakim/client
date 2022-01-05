import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Active from "./components/active";
import Chefpostes from "./components/Chefpostes";
import Profile from "./components/Profile";
import Download from "./components/Download";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Like from "./components/Like";
import Follow from "./components/Follow";
import MyProfile from "./components/MyProfile";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {

  return (
    <div>
      <Header />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
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
