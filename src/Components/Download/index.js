import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { useNavigate } from "react-router-dom";



const BASE_URL = process.env.REACT_APP_BASE_URL;

const Download = () => {
  const navigate = useNavigate();
  const [add, setAddAnother] = useState([[]]);
  const [recipe, setreciper] = useState([[]]);
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
          setImages([...images, url]);
          console.log(url);
        });
      }
    );
  };
  useEffect(() => {
    setProgress(0);
  }, [images]);

  const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  const addPost = async (e) => {
    e.preventDefault();
    console.log(e.target.ingridents.value);
    const result = await axios.post(
      `${BASE_URL}/addPost`,
      {
        title: e.target.title.value,
        image: images,
        recipe: recipe,
        ingridents: add,
      },
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );

    console.log(result.data);
    navigate("/myprofile");
  };

  const updateIngredient = (e, index) => {
    const myIngre = [...add];
    myIngre[index] = e.target.value;
    setAddAnother(myIngre);
  };
  const updaterecepe = (e, index) => {
    const myIngre = [...recipe];
    myIngre[index] = e.target.value;
    setreciper(myIngre);
  };

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  return (
    <div dir="rtl" className="download">
      <form className="dForm" onSubmit={addPost}>
        <label className="modelDes">العنوان</label>
        <input name="title" type="text" placeholder="العنوان" />
        <label className="modelDes"></label>
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
          <br />
          <label className="progress" htmlFor="img">
            اضغط هنا لتحميل الصورة
          </label>

          {!(progress === 0) ? (
            <div className="progress">
              <p>يتم الرفع {progress}%</p>
            </div>
          ) : null}
        </div>
        <div className="imagesPost">
          {images?.map((image) => (
            <img src={image} alt="img" width="80px" height="80px" />
          ))}
        </div>
        <br />
        <label className="modelDes">المكونات</label>
        {add.map((i, index) => (
          <>
            <input
              name="ingridents"
              type="text"
              placeholder="المكونات"
              onChange={(e) => updateIngredient(e, index)}
            ></input>
            <br />
          </>
        ))}
        <button onClick={() => setAddAnother([...add, []])} type="button">
          +
        </button>
        <br />
        <br />
        <label className="modelDes">الخطوات</label>
        {recipe.map((i, index) => (
          <>
            <input
              name="recipe"
              type="text"
              placeholder="الخطوات"
              onChange={(e) => updaterecepe(e, index)}
            ></input>
            <br />
          </>
        ))}
        <button onClick={() => setreciper([...recipe, []])} type="button">
          +
        </button>
        <br />
        <br />
        <button className="submitBtn" type="submit">
          ارسال
        </button>
        <button onClick={() => navigate("/myprofile")} type="button">
          رجوع
        </button>
      </form>
    </div>
  );
};

export default Download;
