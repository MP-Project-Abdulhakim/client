// import React from 'react'

// const Active = () => {
//     return (
//         <div>
//        <h1>active</h1>
//         </div>
//     )
// }

// export default Active

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import WithReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";

const MySwal = WithReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Active = () => {
  const [code, setCode] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const verifyAccount = async () => {
    if (code.length > 0) {
      try {
        const result = await axios.post(`${BASE_URL}/active`, {
          id,
          code,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "your account has been verified",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Ops...",
          text: "worng code ",
          confirmation: "yellow",
        });
      }
    }
  };
  return (
    <div
      borderRadius="3px"
      border="solid silver"
      textAlign="center"
      w="300px"
      mt="100px"
      textAlign="center"
      ml="500px"
      bg="#fffb"
      color="black"
    >
      <h1>verify your account</h1>
      <div paddingLeft="25px" m="10px">
        <ReactCodeInput
          position="center"
          fields={4}
          onComplete={(e) => {
            setCode(e);
          }}
        />
      </div>
      <button id="resetPasswordButton" bg="#777" onClick={verifyAccount}>
        {" "}
        Active
      </button>
    </div>
  );
};
export default Active;
