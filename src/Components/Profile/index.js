import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Profile() {
  const [users, setusers] = useState([]);
  const param = useParams();

  // const navigate = useNavigate();

  useEffect(() => {
    getusers();
    // eslint-disable-next-line
  }, []);

  const getusers = () => {
    axios
      .get("http://localhost:5000/getusers")
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
