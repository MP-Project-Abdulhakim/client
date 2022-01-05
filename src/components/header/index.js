import React from "react";

import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import styles from "../../styles/Header.module.css";

const cx = classNames;

const Header = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });
  return (
    <nav className={cx(styles.nav)}>
      <ul className={cx(styles.menus)}>
        {state.Login.token ? (
          <>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  window.location.reload();
                }}
              >
                تسجيل خروج
              </a>
            </li>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/like")}
              >
                مفضلة الوصفات
              </a>
            </li>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/follow")}
              >
                مفضلة الطباخين
              </a>
            </li>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/myprofile")}
              >
                الملف الشخصي
              </a>
            </li>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/add_recipe")}
              >
                اضافة وصفة
              </a>
            </li>
          </>
        ) : (
          <>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/login")}
              >
                دخول
              </a>
            </li>
            <li className={cx(styles.menu__item)}>
              <a
                className={cx(styles.menu__link)}
                onClick={() => navigate("/signup")}
              >
                تسجيل جديد
              </a>
            </li>
          </>
        )}
        <li className={cx(styles.menu__item)}>
          <a
            className={cx(styles.menu__link)}
            onClick={() => navigate("/aboutus")}
          >
            عن الموقع
          </a>
        </li>
        <li className={cx(styles.menu__item)}>
          <a className={cx(styles.menu__link)} onClick={() => navigate("/")}>
            الرئيسية
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
