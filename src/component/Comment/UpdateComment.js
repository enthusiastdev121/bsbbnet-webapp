import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReplyOfComment from "./ReplyOfComment";
import { toast } from "react-toastify";
import {
  postForumReply,
  postForumReplyMasseuse,
  updateMasseuseComment,
  updateSpaComment,
} from "../../axiosCalls";
import { isLogin } from "../../utils/isLogins";
const UpdateComment = ({
  buttonValue,
  addComments,
  replyingTo,
  count,
  setCount,
  typeUser,
  commentData,
  setUpdateComment,
}) => {
  const [comment, setComment] = useState(commentData.comment);
  const { setCommentOfType, commentOfType, commentIdOfUpdate } =
    useContext(Context);
  console.log(commentData)
  const clickHandler = async () => {
    if (
      comment.substring(3, comment.length - 4) === "" ||
      comment.substring(3, comment.length - 4) === " "
    )
      return;

    const data = JSON.stringify({
      mediaLink: "",
      comment: comment,
      forumId: Number(localStorage.getItem("forumId")),
    });
    if (typeUser === "generic") {

      const genericCommentUpdateData = JSON.stringify({
        mediaLink: "",
        comment: comment,
        forumId: Number(localStorage.getItem("forumId")),
        elasticID: "generic"
      });


      const res = await updateSpaComment(commentData.id, genericCommentUpdateData);
      console.log(res)
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
        setUpdateComment(null);
      }
    } else if (typeUser === "spa") {
      const res = await updateSpaComment(commentData.id, data);
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
        setUpdateComment(null);
      }
    } else {
      const res = await updateMasseuseComment(commentData.id, data);
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
        setUpdateComment(null);
      }
    }
    setCommentOfType("comment");
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        {isLogin() ? (
          <>
            {commentOfType === "update" &&
              commentIdOfUpdate === commentData.id && (
                <>
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
                      modules={UpdateComment.modules}
                      formats={UpdateComment.formats}
                      className="forumComment"
                    />
                    </div>
                    <br />
                    <MDBBtn
                      className="add-btn btn"
                      onClick={clickHandler}
                    >
                      Update
                    </MDBBtn>
                  </div>
                </>
              )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UpdateComment;

UpdateComment.modules = {
  toolbar: [
    ["bold", "italic", "underline", "blockquote"],

    ["link", "image", "video"],
    ["clean"],
  ],
};
UpdateComment.formats = [
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
