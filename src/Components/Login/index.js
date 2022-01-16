import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loginn } from "./../../reducers/Login";
import "./style.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
const popupTools = require("popup-tools");
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emilOrUserName, setEmilOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const login = async () => {
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        usernameOrEmail: emilOrUserName,
        password,
      });
      dispatch(
        Loginn({
          role: res.data.result.role,
          token: res.data.token,
          id: res.data.result._id,
        })
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged in successfully ",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.message);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong email or password, please try again.",
        confirmButtonColor: "black",
      });
    }
  };


  const forgotPassword = async () => {
    const { value: email } = await MySwal.fire({
      title: "Forgot Password",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (email) {
      try {
        await axios.post(`${BASE_URL}/check`, {
          email,
        });
        MySwal.fire({
          icon: "success",
          text: "Check your email to reset the password",
          confirmButtonColor: "black",
        });
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: "Something went wrong!",
          confirmButtonColor: "black",
        });
      }
    }
  };

  return (
    <div className="loginWrapper">
      {state.token ? (
        <>
          <div>
            <div>
              <p>لقد قمت بتسجيل الدخول بالفعل</p>
            </div>
            <div>
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main className="panel">
          <div>
            <h2>دخول</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                login(e);
              }}
            >
              <input
                type="text"
                placeholder="البريد الإلكتروني / اسم المستخدم"
                onChange={(e) => setEmilOrUserName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="الرقم السري"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="forgotPassword" onClick={forgotPassword}>
                نسيت رقمك السري؟
              </p>
              <input id="submitButton" type="submit" value="تسجيل الدخول" />
            </form>
          </div>
          <div className="signUpDiv">
            <h2 className="gotosignUp">مرحبا يا صديقي!</h2>
            <p className="gotosignUp">إذا لم تكن قد سجلت بعد ، قم بالتسجيل</p>
            <button
              className="gotosignUp"
              id="signupButton"
              onClick={() => navigate("/signup")}
            >
              تسجيل
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
