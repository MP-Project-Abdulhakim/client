import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import Header from "../Header";

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
       .get("http://localhost:5000/getPosts")
       .then((response) => {
         setpostes(
           response.data.filter((post) => post.createdBy._id == state.Login.id)
         );
       })
       .catch((err) => {
         console.log(err);
       });
   };




  const getUsers = () => {
    axios
      .get("http://localhost:5000/getusers")
      .then((response) => {
        setUsers(response.data.filter((users) => users._id == state.Login.id));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUSer = async (e) => {
    e.preventDefault();
    console.log();
    const result = await axios.put(
      `http://localhost:5000/updat/${state.Login.id}`,
      {
        password: e.target.password.value,
        username: e.target.username.value,
        imgProfile: images[0],
        email: e.target.email.value,
      },
      { headers: { Authorization: `Bearer ${state.Login.token}` } }
    );

    console.log(result);
    getUsers();
  };

  useEffect(() => {
  }, [users]);

 const imageClick = (id) => {
   navigate(`/Recipe/${id}`);
 };

 



  return (
    <>
      {users.map((item) => (
        <>
          <h1>{item.username} - Profile</h1>
          <br />
          {/* <p>followed {}</p> */}
          {/* <img src={item.imgProfile} /> */}
        </>
      ))}

      <button
        onClick={() => {
          setEdit(true);
        }}
      >
        Edit profile
      </button>
      <br />
      {edit ? (
        <form onSubmit={updateUSer}>
          <label className="modelDes">user name</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            defaultValue={users[0].username}
          />

          <label className="modelDes">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            defaultValue={users[0].email}
          />
          <label className="modelDes">password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            defaultValue={users[0].password}
          />
          <label className="modelDes">img profile</label>

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
            <label htmlFor="img">تحميل صور</label>
            {!(progress == 0) ? (
              <div className="progress">
                <p>يتم الرفع {progress}%</p>
              </div>
            ) : null}
          </div>

          <div className="imagesPost">
            {images?.map((image) => (
              <img src={image} width="80px" height="80px" />
            ))}
          </div>

          <br />
          <button
            type="button"
            onClick={() => {
              setEdit(false);
            }}
          >
            cansle
          </button>
          <button className="submitBtn" type="submit">
            submit
          </button>
        </form>
      ) : (
        <> </>
      )}
      <br />
      {postes.map((item) => (
        <>
          {/* <h1>{item.createdBy.username}</h1> */}
          <p>following {users?.following?.length}</p>
          <p>followed by {users?.followedBy?.length}</p>
          <br />
          <h1>your postes</h1>
          <h1>{item.title}</h1>
          <h1>
            <img src={item.image} onClick={() => imageClick(item._id)} />
          </h1>
        </>
      ))}
    </>
  );
}

export default MyProfile;
