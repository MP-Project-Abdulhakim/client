import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

function Home() {
  const [postes, setpostes] = useState([]);
  const [users, setusers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPostes();
    getusers();
  }, []);
  
  const getPostes = () => {
    
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data);
        console.log(setpostes);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };
  const getusers = () => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setusers(
          response.data.filter(
            (user) => user.role == "61cc4465387a78a3e5b8d772"
          )
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };


  const imageClick = (id) => {
    navigate(`/Recipe/${id}`);
  };

  
  const profileClick = (id) => {
    navigate(`/Chefpostes/${id}`);
  };

  return (
    <>
      <h1>the chef</h1>
      onSubmit {console.log(users)}
      {users.map((item) => (
        <div className="homem_profile" onClick={() => profileClick(item._id)}>
          <img src={item.imgProfile} />
          <p>{item.username}</p>
        </div>
      ))}
      <h1>the posts</h1>
      {postes.map((item) => (
        <>
          <h1>{item.title}</h1>
          <h1>
            <img src={item.image} onClick={() => imageClick(item._id)} />
          </h1>
        </>
      ))}
    </>
  );
}

export default Home;
