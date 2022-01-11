import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import classNames from "classnames";
import grid from "../../styles/grid.css";

const cx = classNames.bind(grid);

function Home() {
  const [postes, setpostes] = useState([]);
  const [users, setusers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getPostes();
    getusers();
  }, []);

  const getPostes = () => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data);
        console.log(setpostes);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {});
  };
  const getusers = () => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setusers(
          response.data.filter(
            (user) => user.role === "61cc4465387a78a3e5b8d772"
          )
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

  const profileClick = (id) => {
    navigate(`/Chefpostes/${id}`);
  };

  return (
    <div className="hoemDiv" dir="rtl">
      
      <text>الطباخين</text>
      <br />

      <div className="HorizontalScroll">
        {users.map((item) => (
          <div onClick={() => profileClick(item._id)}>
            <img className="itm" src={item.imgProfile} alt="img" />

            <div className="card-bodyy">
              <h6 className="card-titlee">{item.username}</h6>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <br />
      <text>الوصفات</text>
      <div className={cx("grid", "grid-column", "grid-gap-1/5")}>
        {postes.map((item) => (
          <div className={cx("card")}>
            <img
              className={cx("card-img")}
              src={item.image}
              alt="img"
              onClick={() => imageClick(item._id)}
            />
            <div className={cx("card-body")}>
              <h3 className={cx("card-subtitle")}>{item.createdBy.username}</h3>
              <h3 className={cx("card-title")}>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
