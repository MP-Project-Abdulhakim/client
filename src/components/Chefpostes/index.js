import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Chefpostes() {
  const [postes, setpostes] = useState([]);
  const param = useParams();

  const navigate = useNavigate();

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

  const imageClick = (id) => {
    navigate(`/Recipe/${id}`);
  };

  return (
    <>
      {postes.map((item) => (
        <>
          <h1>{item.title}</h1>
          <h1>
            {/* <img src={item.image} /> */}
            <img src={item.image} onClick={() => imageClick(item._id)} />
          </h1>
        </>
      ))}
    </>
  );
}

export default Chefpostes;
