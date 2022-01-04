import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import './style.css'



const Download = () => {


 const state = useSelector((state) => {
   return {
     Login: state.Login,
   };
 });
  
  const addPost = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      `http://localhost:5000/addPost`,
      {
        title: e.target.title.value,
        image: e.target.image.value,
        recipe: e.target.recipe.value,
        ingridents: e.target.ingridents.value,
      },
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );

    console.log(result);
    
  };





  return (
    <div className="download">
      <form onSubmit={addPost}>
        <label className="modelDes">title</label>
        <input name="title" type="text" placeholder="title" />

        <label className="modelDes">image</label>
        <input name="image" type="text" placeholder="image" />

        <label className="modelDes">ingridents</label>
        <input name="ingridents" type="text" placeholder="ingridents" />

        <label className="modelDes">recipe</label>
        <input name="recipe" type="text" placeholder="recipe" />

        <br />
        <button
          type="button"
          onClick={() => {
            // setEdit(false);
          }}
        >
          cansle
        </button>
        <button className="submitBtn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default Download;
