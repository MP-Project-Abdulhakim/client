import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Recipe() {
  const [postes, setpostes] = useState([]);
  const param = useParams();
console.log(param);
  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = () => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data.filter((post)=>post._id==param.id));
        console.log(postes[0].title);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  return (
    <>
      <>
        <h1>{postes[0]?.title}</h1>

        <img src={postes[0]?.image} />
      </>
    </>
  );
}

export default Recipe;
