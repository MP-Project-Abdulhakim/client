import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import grid from "../../styles/grid.css";
import classNames from "classnames";
import "../Chefpostes/style.css";
const cx = classNames.bind(grid);

function Profile() {
  const [postes, setpostes] = useState([]);
  const param = useParams();

  const navigate = useNavigate();

  console.log(param);
  useEffect(() => {
    getPostes();
    // eslint-disable-next-line
  }, []);



  const getPostes = () => {
    
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(
          response.data.filter((post) => post.createdBy._id === param.id)
        );
        console.log(
          response.data.filter((post) => post.createdBy._id === param.id)
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
    console.log(users);
    // eslint-disable-next-line
  }, []);

  const getfollowed = () => {
    axios
      .get("http://localhost:5000/getfollowed")
      .then((response) => {
        console.log(response.data.filter((i) => i.username === state.Login.id));
        setUsers(response.data.filter((i) => i.username === state.Login.id)[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div dir="rtl" className="hoemDiv">
      {postes.map((item) => (
        <>
          <div>
            <h3>{item.createdBy.username}</h3>
            {/* <h6> يتابع {users?.following?.length} </h6>
            <h6>يتابعه {users?.followedBy?.length}</h6>
            {console.log(users.username)} */}
          </div>
          <br></br>
          <hr />
          <br></br>
          <div className={cx("card-detaill")}>
            <div>
              <h3>{item.title}</h3>
              <img
                className={cx("card-img")}
                src={item.image}
                alt="img"
                onClick={() => imageClick(item._id)}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Profile;
