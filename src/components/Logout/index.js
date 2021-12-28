import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Logoutt } from "../../reducers/Login";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const state = useSelector((state) => {
  //     return {
  //       users: state.users,
  //     };
  //   });
  const logOut = () => {
    navigate(`/`);
    dispatch(Logoutt({ token: "" }));
  };

  return (
    <div>
      <button onClick={logOut}>go to Logout</button>
    </div>
  );
};

export default Logout;
