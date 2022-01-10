import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import grid from "../../styles/grid.css";
import classNames from "classnames";
import "../Like/style.css";
const cx = classNames.bind(grid);

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
    // eslint-disable-next-line
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
          response.data.filter((users) => users.userId === state.Login.id)
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };

  const imageClick = (id) => {
    navigate(`/Recipe/${id}`);
  };

  return (
    <div className="hoemDiv" dir="rtl">
      <h3>مفضلة الوصفات</h3>
      {users?.map((item) => (
        <>
          <div></div>
          <br></br>
          <hr />
          <br></br>
          <div className={cx("card-detail")}>
            <div>
              <h3>{item.postId.title}</h3>
              <img
                className={cx("card-img")}
                src={item.postId.image}
                alt="img"
                onClick={() => imageClick(item.postId._id)}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default Like;
