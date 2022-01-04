import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
      const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });
    return (
      <div>
        {state.Login.token ? (
          <>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/");
                window.location.reload()
              }}
            >
              تسجيل خروج
            </button>
            <button onClick={() => navigate("/like")}>مفضلة الوصفات</button>
            <button onClick={() => navigate("/follow")}>مفضلة الطباخين</button>
            <button onClick={() => navigate("/myprofile")}>الملف الشخصي</button>
            <button onClick={() => navigate("/add_recipe")}>اضافة وصفة</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>دخول</button>
            <button onClick={() => navigate("/signup")}>تسجيل جديد</button>
          </>
        )}

        <button onClick={() => navigate("/aboutus")}>عن الموقع</button>
        <button onClick={() => navigate("/")}>الرئيسية</button>
      </div>
    );
}

export default Header
