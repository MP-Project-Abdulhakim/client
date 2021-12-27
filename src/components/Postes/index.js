import React from "react";

const Postes = (props) => {
    // console.log(props.post.title);

//desrksh
 const { title, video, image, recipe, ingridents, like, deleted, createdBy } =
   props.post;
  return (
    <div className="Postes">
      <p>title--{title}</p>
      <p>img----{image}</p>
    </div>
  );
};

export default Postes;
