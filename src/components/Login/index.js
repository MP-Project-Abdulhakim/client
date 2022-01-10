import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loginn } from "./../../reducers/Login";
import "./style.css";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
// const popupTools = require("popup-tools");
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
      const res = await axios.post(`http://localhost:5000/login`, {
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

  // const googleLogin = () => {
  //   popupTools.popup(
  //     `${BASE_URL}/auth/google`,
  //     "Google Login",
  //     { width: 400, height: 600 },
  //     function (err, user) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         dispatch(
  //           Loginn({
  //             role: user.data.result.role,
  //             token: user.data.token,
  //           })
  //         );
  //         navigate("/");
  //       }
  //     }
  //   );
  // };

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
        await axios.post(`${BASE_URL}/email_check`, {
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
              <p>You already loggedin, you don't need to login</p>
            </div>
            <div>
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main className="panel">
          <div>
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
                placeholder="Email/Username"
                onChange={(e) => setEmilOrUserName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="forgotPassword" onClick={forgotPassword}>
                forgot your password?
              </p>
              <input id="submitButton" type="submit" value="Submit" />
            </form>
          </div>
          <div className="signUpDiv">
            <p className="gotosignUp">
              if you haven't registered yet, sign up to receive our weekly
              offers
            </p>
            <button
              className="gotosignUp"
              id="signupButton"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
