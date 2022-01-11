import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const BASE_URL = process.env.REACT_APP_BASE_URL;


function Profile() {
  const [users, setusers] = useState([]);
  const param = useParams();



  useEffect(() => {
    getusers();
   
  }, []);

  const getusers = () => {
    axios
      .get(`${BASE_URL}/getusers`)
      .then((response) => {
        setusers(response.data.filter((users) => users._id === param.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  return (
    <>
      {users.map((item) => (
        <>
          <h1>name</h1>
          <h3>{item.username}</h3>
          <img src={item.imgProfile} alt="img" />
        </>
      ))}
    </>
  );
}

export default Profile;
