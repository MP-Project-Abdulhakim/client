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

  //   const gevLike = () => {
  //     axios
  //       .post(
  //         "http://localhost:5000/addLike",
  //         {
  //           postId: param.id,
  //         },
  //         { headers: { Authorization: `Bearer ${state.Login.token}` } }
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         getPostes();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  return (
    <>
      <h1>hi MyProfile</h1>
      {users.map((item) => (
        <>
          <h1>name</h1>
          <h3>{item.username}</h3>
          <img src={item.imgProfile} />
        </>
      ))}
    </>
  );
}

export default MyProfile;
