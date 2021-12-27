import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Postes from "./components/Postes";
function App() {
  const [postes, setpostes] = useState([]);

  useEffect(() => {
   getPostes()
  }, [])

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

  const mapOverPostes = postes.map((elem, i) => (<Postes key={i} post={elem} />));
  // const mapOverPostes = postes.map((elem, i) => {
  //   return <p>{elem.title}</p>;
  // });


  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={getPostes}>getPostes</button>
      {mapOverPostes}
    </div>
  );
}

export default App;
