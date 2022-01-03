import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Like() {
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
        "http://localhost:5000/getLiked",
        {
          userId: state.Login.id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => {
        setUsers(
          response.data.filter((users) => users.userId == state.Login.id)
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };



  return (
    <>
      <h1>hi likes</h1>
      {console.log(users)}
      {users?.map((item) => (
        <>
          <p>name</p>
          <h3>{item.postId.title}</h3>

          {/* <img src={item.imgProfile} /> */}
        </>
      ))}
    </>
  );
}

export default Like;
