import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Postes from "./components/Postes";
import { useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const navigate = useNavigate();
  const [postes, setpostes] = useState([]);

  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = () => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        console.log(response.data);
        setpostes(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  const mapOverPostes = postes.map((elem, i) => <Postes key={i} post={elem} />);
  // const mapOverPostes = postes.map((elem, i) => {
  //   return <p>{elem.title}</p>;
  // });

  return (
    <div className="App">
      <h1>the chef</h1>
      <Logout />
      <button onClick={() => navigate("/login")}>go to login</button>
      <button onClick={() => navigate("/signup")}>go to signup</button>
      <h1>the postes</h1>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>

      {/* <button onClick={() => navigate("/")}>go to Logout</button> */}

      {mapOverPostes}
    </div>
  );
}

export default App;
