// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";



// function Postes() {
//   const [postes, setpostes] = useState([]);
// const navigate = useNavigate();

//   useEffect(() => {
//     getPostes();
//   }, []);

//   const getPostes = () => {
//     axios
//       .get("http://localhost:5000/getPosts")
//       .then((response) => {
//         setpostes(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .then(() => {});
//   };

//   const imageClick = () => {
//     navigate("/Recipe");
//   };


//   return (
//     <>
//       {postes.map((item) => (
//         <>
//           <h1>{item.title}</h1>
//           <h1>
//             <img src={item.image} onClick={imageClick} />
//           </h1>
//         </>
//       ))}
//     </>
//   );
// }

// export default Postes;
