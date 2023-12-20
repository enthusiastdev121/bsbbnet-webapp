
import React, { useState, useContext } from "react";
import { Context } from "../../context/dataContext";
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import ReactQuill from "react-quill";
import "../../css/threadPost.css";
import "../../css/main.css";
import "react-quill/dist/quill.snow.css";
import ReplyOfComment from "./ReplyOfComment";
import { toast } from "react-toastify";
import { postForumReply, postForumReplyMasseuse } from "../../axiosCalls";
import { isLogin } from "../../utils/isLogins";
import UpdateComment from "./UpdateComment";
import UpdateReply from "./UpdateReply";
import { useNavigate } from "react-router-dom";

const ReplyQuill = ({
  buttonValue,
  commentData,
  count,
  setCount,
  typeUser,
  userId,
  setDeleting,
  setDeleteModalState,
  setUpdateComment
}) => {
  const { setCommentOfType, commentOfType, commentId, replyOfUpdate } = useContext(Context);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "blockquote"],
  
        ["link", "image", "video"],
        ["clean"],
      ],
      // handlers: {
      //   image: imageHandler,
      // },
    },
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  const clickHandler = async () => {
    if (!isLogin()) {
      localStorage.setItem("previousPage", window.location.pathname);
      navigate("/login");
    } else {
    if (
      comment.substring(3, comment.length - 4) === "" ||
      comment.substring(3, comment.length - 4) === " "
    )
      return;
    if (typeUser === "generic") {
      const generictReply = JSON.stringify({
        parentId: commentData.id,
        mediaLink: "",
        comment: comment,
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "generic"
      });
      const res = await postForumReply(generictReply);

      if (res.data.success) {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setComment("");
        setCount(count + 1);
      }
    } else if (typeUser === "spa") {
      const spaForumReply = JSON.stringify({
        parentId: commentData.id,
        mediaLink: "",
        comment: comment,
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "SpaForum"
      });
      const res = await postForumReply(spaForumReply);
      if (res.data.success) {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setComment("");
        setCount(count + 1);
      }
    } else {
      const masseuseForumReply = JSON.stringify({
        parentId: commentData.id,
        mediaLink: "",
        comment: comment,
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "MasseuseForum"
      });
      const res = await postForumReplyMasseuse(masseuseForumReply);
      if (res.data.success) {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setComment("");
        setCount(count + 1);
      }
    }
    setCommentOfType("comment");
    }
  };
  return(
    <>
      {commentOfType === "reply" && commentId === commentData.id && (
          <div style={{ width: "100%" }}>
            <div className="add-comment">
              <div className="comment--header">
                <span style={{ color: "#fff", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600" }}>
                  Quick Reply
                </span>
              </div>
              <div className="quill-outline">
              <ReactQuill
                theme="snow"
                value={comment}
                onChange={setComment}
                modules={modules}
                formats={formats}
                style={{ height: "172px" }}
                className="forumComment"
              />
              </div>
              <br />
              <MDBBtn
                className="add-btn btn"
                onClick={clickHandler}
              >
                {buttonValue}
              </MDBBtn>
            </div>
          </div>
      )}
    </>
  );
}

export default ReplyQuill;
