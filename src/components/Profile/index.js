import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Profile() {
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
        setpostes(response.data.filter((post) => post.createdBy == param.id));
        console.log(postes);
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

export default Profile;
