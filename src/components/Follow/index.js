import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Follow() {
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
      .post(
        "http://localhost:5000/getfollowed",
        {
          username: state.Login.id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => { 
        setUsers(
          response.data[0]
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
     ;
  };


  
  const chefPostesClick = (id) => {
    navigate(`/Chefpostes/${id}`);
  };


  return (
    <>
      <h1>you follow</h1>

      {users?.following?.map((item) => (
        <div onClick={() => chefPostesClick(item._id)}>
          <p>name</p>
          <h3>{item.username}</h3>
        </div>
      ))}
    </>
  );
}

export default Follow;
