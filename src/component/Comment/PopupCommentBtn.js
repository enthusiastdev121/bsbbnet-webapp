import './reply.css'
import { ReactComponent as IconReply } from "../../assets/images/icon-reply.svg";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context/dataContext";
import { toast } from "react-toastify";
import { MDBIcon } from "mdb-react-ui-kit";
import Dropdown from 'react-bootstrap/Dropdown';
import {
  deleteSpaForumComment,
  deleteMasseuseForumComment,
} from "../../axiosCalls";

const PopupCommentBtn = ({
  commentData,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
  count,
  setCount,
  setUpdateComment,
  typeUser,
  userId,
}) => {
  const {
    setCommentOfType,
    commentOfType,
    setCommentId,
    setCommentIdOfUpdate,
  } = useContext(Context);

  let counter = false;
  const showAddComment = () => {
    // Logic that was hide the reply from user until clicked on reply button
    // counter ? setReplying(false) : setReplying(true);
    // counter = true;
    setCommentId(commentData.id);

    setCommentOfType("reply");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      if (typeUser === "generic") {
        const res = await deleteSpaForumComment(commentData.id, Number(localStorage.getItem("forumId")), "generic");
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
          setCount(count + 1);
        }
      } else if (typeUser === "spa") {
        const res = await deleteSpaForumComment(commentData.id, Number(localStorage.getItem("forumId")), "SpaForum");
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
          setCount(count + 1);
        }
      } else {
        const res = await deleteMasseuseForumComment(commentData.id, Number(localStorage.getItem("forumId")), "MasseuseForum");
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
          setCount(count + 1);
        }
      }
    }
  };

  const handleUpdateComment = () => {
    setUpdateComment(commentData);
    setCommentIdOfUpdate(commentData.id);
    setCommentOfType("update");
  };

  // delete comment
  const showDeleteModal = () => {
    setDeleting(true);
    setDeleteModalState(true);
  };

  // edit comment
  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      <span>
        {commentData.userId == localStorage.getItem("userID") ||
        localStorage.getItem("userID") == 10 ? (
        <Dropdown className="float-right">
          <Dropdown.Toggle as={CustomToggle}>
          <span className="text-lg">...</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="!mt-1 -translate-x-[10px]  min-[1730px]:-translate-x-[130px] !translate-y-[20px]" style={{padding:"0px", borderRadius:"8px"}}>
            <Dropdown.Item onClick={handleUpdateComment} eventKey="1" style={{padding:"8px", paddingLeft:"16px"}}><i class="far fa-edit mr-3"></i>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteComment} eventKey="2" style={{padding:"8px", paddingLeft:"16px"}}><i class="far fa-trash-alt mr-3"></i>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        ) : (
          <Dropdown className="float-right invisible">
          <Dropdown.Toggle as={CustomToggle}>
          <span className="text-lg">...</span>
          </Dropdown.Toggle>

          <Dropdown.Menu className="!mt-1 -translate-x-[10px]  min-[1730px]:-translate-x-[130px] !translate-y-[20px]" style={{padding:"0px", borderRadius:"8px"}}>
            <Dropdown.Item onClick={handleUpdateComment} eventKey="1" style={{padding:"8px", paddingLeft:"16px"}}><i class="far fa-edit mr-3"></i>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteComment} eventKey="2" style={{padding:"8px", paddingLeft:"16px"}}><i class="far fa-trash-alt mr-3"></i>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )}
      </span>
    </div>
  );
};

export default PopupCommentBtn;
