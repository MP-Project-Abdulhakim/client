import React from "react";
import logo from "../../img/logo.webp";
import { useSelector } from "react-redux";
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
    <>
      <div dir="rtl">
        <nav className={cx(styles.nav)}>
          <ul dir="ltr" className={cx(styles.menus)}>
            {state.Login.token ? (
              <>
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    تسجيل خروج
                  </p>
                </li>
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => navigate("/like")}
                  >
                    مفضلة الوصفات
                  </p>
                </li>
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => navigate("/follow")}
                  >
                    مفضلة الطباخين
                  </p>
                </li>
                <img className="logop" alt="" src={logo} />
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => navigate("/myprofile")}
                  >
                    الملف الشخصي
                  </p>
                </li>
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => navigate("/add_recipe")}
                  >
                    اضافة وصفة
                  </p>
                </li>
                <li className={cx(styles.menu__item)}>
                  <p
                    className={cx(styles.menu__link)}
                    onClick={() => navigate("/")}
                  >
                    الرئيسية
                  </p>
                </li>
              </>
            ) : (
              <>
                <ul>
                  <li className={cx(styles.menu__item)}>
                    <p
                      className={cx(styles.menu__link)}
                      onClick={() => navigate("/login")}
                    >
                      دخول
                    </p>
                  </li>
                  <li className={cx(styles.menu__item)}>
                    <p
                      className={cx(styles.menu__link)}
                      onClick={() => navigate("/signup")}
                    >
                      تسجيل جديد
                    </p>
                  </li>
                  <img className="logop" alt="" src={logo} />
                  <li className={cx(styles.menu__item)}>
                    <p
                      className={cx(styles.menu__link)}
                      onClick={() => navigate("/aboutus")}
                    >
                      عن الموقع
                    </p>
                  </li>
                  <li className={cx(styles.menu__item)}>
                    <p
                      className={cx(styles.menu__link)}
                      onClick={() => navigate("/")}
                    >
                      الرئيسية
                    </p>
                  </li>
                </ul>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
