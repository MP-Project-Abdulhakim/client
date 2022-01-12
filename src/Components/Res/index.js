import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";


const MySwal = withReactContent(Swal);
const BASE_URL = process.env.REACT_APP_BASE_URL;


const Res = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState(" ");
  const [password, setPassword] = useState(" ");
  const resetPassword = async () => {
    if (code.length > 0) {
      try {
        await axios.post(`${BASE_URL}/reset`, {
          id,
          code,
          password,
        });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password Changed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, please try again.",
          confirmButtonColor: "black",
        });
      }
    }
  };
  return (
    <div bg="rgba(242, 242, 242, 1)">
      
        <div>
          
          <div
            borderRadius="3px"
            boxShadow="md"
            textAlign="center"
            w="360px"
            bg="#fffb"
            color="black"
            mt="30"
            p="10"
            marginBottom="19"
          >
            <div>
              <h1>Reset Password</h1>
              <div fontSize="14">
                {" "}
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "lowercase",
                  ]}
                  minLength={6}
                  value={password}
                  onChange={(isValid) => {
                    if (isValid) {
                      const button = document.querySelector(
                        "#resetPasswordButton"
                      );
                      button.disabled = false;
                    } else {
                      const button = document.querySelector(
                        "#resetPasswordButton"
                      );
                      button.disabled = true;
                    }
                  }}
                />
              </div>
              <input
                bg="#222"
                color="white"
                textAlign="center"
                width="40"
                type="password"
                placeholder="Password"
                className="resetPassword"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
              <button
                bg="#777"
                id="resetPasswordButton"
                onClick={resetPassword}
              >
                Reset
              </button>
            </div>{" "}
          </div>
        </div>
      
    </div>
  )
 
}
export default Res;



