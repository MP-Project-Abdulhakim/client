import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MyProfile() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  console.log(state);
  useEffect(() => {
    getUsers();
  }, []);


  const getUsers = () => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        console.log("0000", response.data);
        setUsers(response.data.filter((users) => users._id == state.Login.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  

  return (
    <>
      <h1>hi MyProfile</h1>
      {users.map((item) => (
        <>
        
          <h1>name</h1>
          <h3>{item.username}</h3>
          <p>followed {}</p>
          <img src={item.imgProfile} />
        </>
      ))}
    </>
  );
}

export default MyProfile;
