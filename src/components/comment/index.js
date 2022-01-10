import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './style.css'
const Commentss = () => {
 const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [noComment, setNoComment] = useState(0);
  const [commments, setcommments] = useState([]);
useEffect(() => {
  getComments();
  // eslint-disable-next-line
}, [])


    const param = useParams();

    const state = useSelector((state) => {
    return {
      Login: state.Login,
    };
  });

  console.log(state);

      const sendComment = async (e) => {
        e.preventDefault();
      
          try {
            const result = await axios.post(
              `${BASE_URL}/createComment`,
              {
                theComment: e.target.comment.value,
                onPost:param.id
              },
              { headers: { Authorization: `Bearer ${state.Login.token}` } }
            );
            console.log(result.data);
            getComments();
          } catch (err) {
            console.error(err);
          }
          e.target.comment.value = "";
        }



      const getComments = async () => {
        try {
          const result = await axios.get(
            `${BASE_URL}/getComments/${param.id}`
          );
          console.log(result.data);
          setcommments(result.data);
          setNoComment(result.data.length);
        } catch (err) {
          console.error(err);
        }
      };




  return (
    <div className="hoemDiv" dir="rtl">
      <form className="comments_form" onSubmit={sendComment}>
        <div className="commentHead">
          <h3>إضافة تعليق</h3>
          <button type="submit" className="submit_comment_btn">
            إرسال
          </button>
        </div>
        <div className="commentTail">
          <img
            src="https://www.nicepng.com/png/full/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png"
            alt=""
            width="200"
          />
          <textarea
            dir="rtl"
            name="comment"
            placeholder="محتوى التعليق"
            required
            cols="55"
            rows="8"
          ></textarea>
        </div>
        <div className="numComment">
          <h3 dir="rtl">{noComment} تعليق</h3>
        </div>
        {commments
          ?.map((comment, index) => {
            return (
              <div className="realComment" dir="rtl" key={index}>
                <hr />
                <div className="realcommentRow">
                  <div className="flex_inline">
                    <img
                      src="https://www.nicepng.com/png/full/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png"
                      alt=""
                    />
                    <div className="realcommentData">
                      <h3>{comment.createdBy.username}</h3>
                      <p>{comment.theComment}</p>
                      <p className="dateP">
                        {comment.createdAt.slice(0, 10)}{" "}
                        {comment.createdAt.slice(11, 16)}
                      </p>
                    </div>
                  </div>
                  <div className="flex_inline">
                    {/* {comment.user._id == User?.result?._id ? (
                      <p
                        className="del"
                        onClick={() => DeleteComment(comment._id)}
                      >
                        <i class="far fa-trash-alt"></i>
                      </p>
                    ) : (
                      <></>
                    )}
                    {comment.user._id == User?.result?._id ? (
                      <p
                        className="del"
                        onClick={() => UpdateComment(comment._id)}
                      >
                        <i class="far fa-edit"></i>
                      </p>
                    ) : (
                      <></>
                    )} */}
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
      </form>
    </div>
  );
};

export default Commentss
