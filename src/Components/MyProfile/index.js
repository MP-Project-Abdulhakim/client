import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import grid from "../../styles/grid.css";
import classNames from "classnames";

const cx = classNames.bind(grid);

const BASE_URL = process.env.REACT_APP_BASE_URL;



function MyProfile() {
  const [users, setUsers] = useState([]);
  const [postes, setpostes] = useState([]);

  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setImages(url);
          console.log(url);
        });
      }
    );
  };
  useEffect(() => {
    setProgress(0);
  }, [images]);

  console.log(state);
  useEffect(() => {
    getUsers();
    getPostes();
  
  }, []);

  const getPostes = () => {
    axios
      .get(`${BASE_URL}/getPosts`)
      .then((response) => {
        console.log(response.data);
        setpostes(
          response.data.filter((post) => post.createdBy._id === state.Login.id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePostes = (id) => {
    axios.delete(`${BASE_URL}/deletePost/${id}`, {
      headers: { Authorization: `Bearer ${state.Login.token}` },
    });
    getPostes();
    setTimeout(() => {
    getPostes();
      
    }, 200);
  };

  const getUsers = () => {
    axios
      .get(`${BASE_URL}/getusers`)
      .then((response) => {
        setUsers(response.data.filter((users) => users._id === state.Login.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUSer = async (e) => {
    e.preventDefault();
    console.log(
      e.target.password.value,
      e.target.username.value,
      images,
      e.target.email.value
    );

    let theImage = "";
    if (images.length > 0) theImage = images;
    else theImage = users[0].imgProfile;

    
    const result = await axios.put(
      `${BASE_URL}/updat/${state.Login.id}`,
      {
        password: e.target.password.value,
        username: e.target.username.value,
        imgProfile: theImage,
        email: e.target.email.value,
      },
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );

    console.log(result);
    getUsers();
  };

  useEffect(() => {}, [users]);

  const imageClick = (id) => {
    navigate(`/Recipe/${id}`);
  };

  return (
    <div className="hoemDiv" dir="rtl">
      {users.map((item) => (
        <>
          <h3>{item.username}</h3>
          <br />
        </>
      ))}

      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        تعديل البيانات
      </button>
      <br />
      {edit ? (
        <form onSubmit={updateUSer}>
          <label className="modelDes">الاسم</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            defaultValue={users[0].username}
          />

          <label className="modelDes">البريد</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            defaultValue={users[0].email}
          />
          <label className="modelDes">الرقم السري</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            defaultValue={users[0].password}
          />
          <label className="modelDes">صورة الملف الشخصي</label>

          <div className="upload">
            <input
              type="file"
              accept=".gif,.jpg,.jpeg,.png"
              onChange={(e) => {
                uploadPictures(e);
              }}
              id="img"
              style={{ display: "none" }}
            />
            <label className="downlodImgProfile" htmlFor="img">اضغط هنا لتحميل الصورة</label>
            {!(progress === 0) ? (
              <div className="progress">
                <p>يتم الرفع {progress}%</p>
              </div>
            ) : null}
          </div>

          <div className="imagesPost">
            {/* {images?.map((image) => (
              <img src={image} width="80px" height="80px" />
            ))} */}
          </div>

          <br />
          <button
            type="button"
            onClick={() => {
              setEdit(false);
            }}
          >
            الغاء
          </button>
          <button className="submitBtn" type="submit">
            ارسال
          </button>
        </form>
      ) : (
        <> </>
      )}
      <br />
      <h3>وصفاتك</h3>
      <hr />
      {postes.map((item) => (
        <>
          {/* <p>انت تتابع {users?.following?.length}</p>
          <p>المتابعين {users?.followedBy?.length}</p> */}

          <br />

          <br />
          <div className={cx("card-detail")}>
            <div>
              <div>
                <h3>{item.title}</h3>
                <button onClick={() => deletePostes(item._id)}>
                  حذف الوصفة
                </button>
              </div>
              <img
                className={cx("card-img")}
                src={item.image}
                alt="img"
                onClick={() => imageClick(item._id)}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default MyProfile;
