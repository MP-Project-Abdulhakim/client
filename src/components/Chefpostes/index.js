import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
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
        setpostes(response.data.filter((post) => post.createdBy._id == param.id));
        console.log(
          response.data.filter((post) => post.createdBy._id == param.id)
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




    const [users, setUsers] = useState([]);

    const state = useSelector((state) => {
      return {
        Login: state.Login,
      };
    });

    console.log(state);
    useEffect(() => {
      getfollowed();
    }, []);

    const getfollowed = () => {
      axios
        .get("http://localhost:5000/getfollowed")
        .then((response) => {
          console.log(response.data.filter((i) => i.username == state.Login.id));
          setUsers(response.data.filter((i) => i.username == state.Login.id)[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  return (
    <>
      {postes.map((item) => (
        <>
          <h1>{item.createdBy.username}</h1>
          <p>following {users?.following?.length}</p>
          <p>followed by {users?.followedBy?.length}</p>
          <h1>{item.title}</h1>
          <h1>
            <img src={item.image} onClick={() => imageClick(item._id)} />
          </h1>
        </>
      ))}
    </>
  );
}

export default Profile;
