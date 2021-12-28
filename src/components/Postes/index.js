import React from "react";

const Postes = (props) => {
    // console.log(props.post.title);

//desrksh
 const { title, video, image, recipe, ingridents, like, deleted, createdBy } =
   props.post;
  return (
    <div className="Postes">
      <p>title--{title}</p>
      <img src={image} alt="" />
    </div>
  );
};

export default Postes;
