import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MyProfile() {
  const [users, setUsers] = useState([]);
 const [postes, setpostes] = useState([]);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  console.log(state);
  useEffect(() => {
    getUsers();
    getPostes();
  }, []);


   const getPostes = () => {
     axios
       .get("http://localhost:5000/getPosts")
       .then((response) => {
         setpostes(
           response.data.filter((post) => post.createdBy._id == state.Login.id)
         );
       })
       .catch((err) => {
         console.log(err);
       });
   };




  const getUsers = () => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setUsers(response.data.filter((users) => users._id == state.Login.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUSer = async (e) => {
    e.preventDefault();
    const result = await axios.put(
      `http://localhost:5000/updat/${state.Login.id}`,
      {
        password: e.target.password.value,
        username: e.target.username.value,
        imgProfile: e.target.imgProfile.value,
        email: e.target.email.value,
      },
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );

    console.log(result);
    getUsers();
  };

  useEffect(() => {
  }, [users]);

 const imageClick = (id) => {
   navigate(`/Recipe/${id}`);
 };

 



  return (
    <>
      {users.map((item) => (
        <>
          <h1>{item.username} - Profile</h1>
          <br />
          {/* <p>followed {}</p> */}
          {/* <img src={item.imgProfile} /> */}
        </>
      ))}

      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit profile
      </button>
      <br />
      {edit ? (
        <form onSubmit={updateUSer}>
          <label className="modelDes">user name</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            defaultValue={users[0].username}
          />

          <label className="modelDes">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            defaultValue={users[0].email}
          />
          <label className="modelDes">password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            defaultValue={users[0].password}
          />
          <label className="modelDes">img profile</label>
          <input
            name="imgProfile"
            type="text"
            placeholder="imgProfile"
            // defaultValue={users[0].imgProfile}
          />

          <br />
          <button
            type="button"
            onClick={() => {
              setEdit(false);
            }}
          >
            cansle
          </button>
          <button className="submitBtn" type="submit">
            submit
          </button>
        </form>
      ) : (
        <> </>
      )}
      <br />
      {postes.map((item) => (
        <>
          {/* <h1>{item.createdBy.username}</h1> */}
          <p>following {users?.following?.length}</p>
          <p>followed by {users?.followedBy?.length}</p>
          <br />
          <h1>your postes</h1>
          <h1>{item.title}</h1>
          <h1>
            <img src={item.image} onClick={() => imageClick(item._id)} />
          </h1>
        </>
      ))}
    </>
  );
}

export default MyProfile;
