import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Commentss from "../comment";

function Recipe() {
  const [postes, setpostes] = useState([]);
  const [isLike, setisLike] = useState(false);
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
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        setpostes(response.data.filter((post) => post._id == param.id));

        let check = response.data
          .filter((post) => post._id == param.id)[0]
          .like.map((i) => i.userId == state.Login.id);

        if (check.includes(true)) {
          setisLike(true);
        }else {
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
        "http://localhost:5000/addLike",
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


  
  const removeLike = () => {
    axios
      .put(
        "http://localhost:5000/deleteLike",
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


  const recipe = postes[0]?.recipe.map(function (item, i) {
    return <li>{item}</li>;
  });

  const ingridents = postes[0]?.ingridents.map(function (item, i) {
    return <li>{item}</li>;
  });

  return (
    <>
      <h1>{postes[0]?.title}</h1>
      <img src={postes[0]?.image} />
      <h1>recipe</h1>
      {recipe}
      <h1>ingridents</h1>
      {ingridents}

      <hr />
      {isLike ? (
        <button onClick={() => removeLike()}>remove like</button>
      ) : (
        <button onClick={() => gevLike()}>like</button>
      )}

      <Commentss />
    </>
  );
}

export default Recipe;
