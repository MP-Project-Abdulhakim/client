import axios from "axios";
import { useState, useEffect } from "react";

function Postes() {
  const [postes, setpostes] = useState([]);

  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = () => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };



  return (
    <>
      {postes.map((item) => (
        <>
          <h1>{item.title}</h1>
          <h1>
            <img src={item.image}  />
          </h1>
        </>
      ))}
    </>
  );
}

export default Postes;
