import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Commentss from "../comment";
import grid from "../../styles/grid.css";
import classNames from "classnames";
import "./style.css";
import Swal from "sweetalert2";

const cx = classNames.bind(grid);

const BASE_URL = process.env.REACT_APP_BASE_URL;



function Recipe() {
  const Navigate = useNavigate();

  const [postes, setpostes] = useState([]);
  const [isLike, setisLike] = useState(false);
  const [isFollow, setFollow] = useState(false);

  const param = useParams();
  useEffect(() => {
    getPostes();
    
  }, []);

  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  const getPostes = () => {
    axios
      .get(`${BASE_URL}/getPosts`)
      .then((response) => {
        console.log(response.data);
        setpostes(response.data.filter((post) => post._id === param.id));

        let check = response.data
          .filter((post) => post._id === param.id)[0]
          .like.map((i) => i.userId === state.Login.id);

        if (check.includes(true)) {
          setisLike(true);
        } else {
          setisLike(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gevLike = () => {
    axios
      .post(
        `${BASE_URL}/addLike`,
        {
          postId: param.id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        getPostes();
      })
      .catch((err) => {
        console.log(err);
       Swal.fire({
         position: "center",
         title: "يجب عليك تسجيل الدخول",
         showConfirmButton: false,
         timer: 1500,
       });
      });
  };

  const removeLike = () => {
    axios
      .put(
        `${BASE_URL}/deleteLike`,
        {
          postId: param.id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        getPostes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsersFollowing = () => {
    axios
      .get(`${BASE_URL}/getfollowed`)
      .then((response) => {
        if (postes[0]?.createdBy._id != null) {
          console.log(
            response.data.filter(
              (user) => user.username === postes[0]?.createdBy._id
            )
          );
          console.log(response.data);
          if (
            response.data
              .filter((user) => user.username === postes[0]?.createdBy._id)[0]
              .followedBy.includes(state.Login.id)
          ) {
            console.log("im followed");
            setFollow(true);
          } else {
            console.log("not followed");
            setFollow(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsersFollowing();
   
  }, [postes]);

  const gevFollow = () => {
    axios
      .post(
        `${BASE_URL}/follow`,
        {
          following: postes[0]?.createdBy._id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        getPostes();
      })
      .catch((err) => {
       Swal.fire({
         position: "center",
         title: "يجب عليك تسجيل الدخول",
         showConfirmButton: false,
         timer: 1500,
       });
      });
  };

  const removeFollow = () => {
    axios
      .put(
        `${BASE_URL}/deletefollow`,
        {
          following: postes[0]?.createdBy._id,
        },
        { headers: { Authorization: `Bearer ${state.Login.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        getPostes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const recipe = postes[0]?.recipe.map(function (item, i) {
    return (
      <form action="">
        <input type="checkbox" />
        <label htmlFor="checkbox">{item}</label>
      </form>
    );
  });

  const ingridents = postes[0]?.ingridents.map(function (item, i) {
    return <li>{item}</li>;
  });

  return (
    <div className="hoemDiv" dir="rtl">
      <div className={cx("card-detail")}>
        <img className={cx("card-img")} src={postes[0]?.image} alt="img" />

        <div>
          <h3 className={cx("card-title")}>{postes[0]?.title}</h3>
          <h4>المكونات</h4>
          <hr />
          {ingridents}
          <br></br>
          <br></br>
          <h4>الخطوات</h4>
          <hr />
          <div className="rec">{recipe}</div>
        </div>
        <div>
          {!isLike ? (
            <button onClick={() => gevLike()}>تفضيل</button>
          ) : (
            <button onClick={() => removeLike()}>الغاء التفضيل</button>
          )}

          {!isFollow ? (
            <button onClick={() => gevFollow()}>متابعة</button>
          ) : (
            <button onClick={() => removeFollow()}>الغاء المتابعة</button>
          )}
        </div>
        <hr />
      </div>
      <Commentss />
    </div>
  );
}

export default Recipe;
