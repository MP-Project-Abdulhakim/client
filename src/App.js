import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Active from "./components/active";
import Chefpostes from "./components/Chefpostes";
import Profile from "./components/Profile";




const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/Profile/:id" element={<Profile />} />
        <Route exact path="/Recipe/:id" element={<Recipe />} />
        <Route exact path="/active/:id" element={<Active />} />
        <Route exact path="/Chefpostes/:id" element={<Chefpostes />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
