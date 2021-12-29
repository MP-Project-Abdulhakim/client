import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import Postes from "./components/Postes";
import Home from "./components/Home";
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import Profile from "./components/Profile";


const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  // const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      {/* <Postes/> */}
      <Routes>
        <Route exact path="/Recipe/:id" element={<Recipe />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
