import React from 'react'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
      const navigate = useNavigate();

    return (
      <div>
        <button onClick={() => navigate("/login")}>دخول</button>
        <button onClick={() => navigate("/signup")}>تسجيل جديد</button>
        <button onClick={() => navigate("/aboutus")}>عن الموقع</button>
        <button onClick={() => navigate("/like")}>مفضلة الوصفات</button>
        <button onClick={() => navigate("/follow")}>مفضلة الطباخين</button>
        <button onClick={() => navigate("/myprofile")}>الملف الشخصي</button>
        <button onClick={() => navigate("/add_recipe")}>اضافة وصفة</button>
        <button onClick={() => navigate("/")}>الرئيسية</button>

      </div>
    );
}

export default Header
