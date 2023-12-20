import React, { useState, useContext } from "react";
import { Context } from "../../context/dataContext";
import { MDBBtn, MDBCol, MDBRow } from "mdb-react-ui-kit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../css/threadPost.css";
import ReplyOfComment from "./ReplyOfComment";
import { toast } from "react-toastify";
import { postForumReply, postForumReplyMasseuse } from "../../axiosCalls";
import { isLogin } from "../../utils/isLogins";
import UpdateComment from "./UpdateComment";
import UpdateReply from "./UpdateReply";
import { useNavigate } from "react-router-dom";
const AddComment = ({
  buttonValue,
  addComments,
  replyingTo,
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
  const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
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
        // toast(res.data.message, {
        //   position: "top-right",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
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
        toast.success(res.data.message);
        setComment("");
        setCount(count + 1);
      }
    }
    setCommentOfType("comment");
  }

  };

  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      clickHandler();
    }
  };

  // formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent',
  //   'link', 'image'
  // ],

  // console.log("the comment id you want to have reply is  ", commentData?.Replies);

  return (
    <div>
      {commentData?.Replies?.map((reply) => (
        <>
          {commentOfType === "updateReply" && reply.id === replyOfUpdate.id ? <>
            <UpdateReply
              count={count}
              setCount={setCount}
              typeUser={typeUser}
              commentData={replyOfUpdate}
              setUpdateComment={setUpdateComment}
            />
          </> : <>
            <p>
              <ReplyOfComment commentData={reply}

                setDeleting={setDeleting}
                setDeleteModalState={setDeleteModalState}

                count={count}
                setCount={setCount}
                setUpdateComment={setUpdateComment}
                typeUser={typeUser}
                userId={userId}
              />
            </p>
          </>
          }
        </>
      ))}
    </div>
  );
};

export default AddComment;

AddComment.modules = {
  toolbar: [
    ["bold", "italic", "underline", "blockquote"],

    ["link", "image", "video"],
    ["clean"],
  ],
};
AddComment.formats = [
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
