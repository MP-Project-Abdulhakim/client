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
        console.log(result);
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
    <div className="activee">
     
    
      
        <h3>تأكيد الحساب</h3>
        <div >
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
          تفعيل
        </button>
      
    </div>
  );
};
export default Active;
