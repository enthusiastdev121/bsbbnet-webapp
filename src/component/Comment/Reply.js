import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";

import AddComment from "./AddComment";
import UpdateComment from "./UpdateComment";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import PopupCommentBtn from "./PopupCommentBtn";
import { changeLikes } from "../../axiosCalls";
import { toast } from "react-toastify";
import { MDBCol, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReplyQuill from "./ReplyQuill";
import { getCommentById } from "../../axiosCalls";
import Wrote from './Wrote';

const Reply = ({
  commentData,
  commentPostedTime,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
  count,
  setCount,
  typeUser,
  userId,
  updateCommentData,
  userData,
  updateUserData,
}) => {
  const [replying, setReplying] = useState(true);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useState(false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);
  const [updatComment, setUpdateComment] = useState(null);
  const [thumbColor, setThumbColor] = useState("");
  const [temp, setTemp] = useState(false)

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    localStorage.setItem("voteState", vote);
  }, [differenceInTime, commentPostedTime, vote]);

  useEffect(() => {
    const commentDetail = async () => {
      const res = await getCommentById(commentData.id);
      updateCommentData(res.data.data);
      if(res.data.data.user.id == userData.id) {
        updateUserData(res.data.data.user);
      }
    };
    commentDetail();
  }, [temp]);

  useEffect(() => {
    if(commentData.likes?.length != 0 && commentData.no_likes != 0) {
      setThumbColor("rgb(192, 28, 91)");
    }
    else {
      setThumbColor("");
    }
  }, []);
  // adding reply
  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  const commentContent = () => {
    const text = commentData.comment.trim().split(" ");
    const firstWord = text.shift().split(",");

    return (
      <div className="comment-content">
        <span
          className="replyingTo"
          style={{ color: " #322d2d", fontSize: "16px" }}
        >
          {Parser(commentData.comment)}
        </span>
      </div>
    );
  };

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  // delete comment
  const deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  const toggleLike = async() => {
    const res = await changeLikes(commentData.id);
    console.log(res);
    if (res.data.success) {
      setTemp(!temp);
      if(thumbColor=="") {
        setThumbColor("rgb(192, 28, 91)");
      }
      else {
        setThumbColor("");
      }
    };
  };

  const formatTime = (timeString) => {
    if(timeString == null) return;
    else {
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }
  };

  return (
    <div className={`comment-container`} style={{ border: "solid 1px #e2e2e2" }}>
      <div className="comment--body">
        <CommentHeader commentData={commentData} />
        <div className="relative right-3">
          <PopupCommentBtn
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
            count={count}
            setCount={setCount}
            setUpdateComment={setUpdateComment}
            typeUser={typeUser}
            userId={userId}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ backgroundColor:"#f6f7f8", width: 250 }} className="p-3 thread-info">
            <div>
              <div>
                {commentData?.user?.image?.length != 0 ? (<img src={commentData?.user?.image} className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                ):(
                  <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                )}
              </div>
              <p style={{ marginBottom:'0px', fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                {commentData?.user?.userName} 
              </p>
            </div>
            <hr />
            <div padding="auto" width="100%">
              <MDBRow>
                <span>
                  <MDBIcon far icon="calendar" className="me-2 mb-2"/>
                  {commentData?.user?.createdAt?.substring(0, 10)}
                </span>
              </MDBRow>
              <MDBRow>
                <span>
                  <MDBIcon fas icon="file" className="me-2 mb-2" />
                  {commentData?.user?.total_post} posts
                </span>
              </MDBRow>
              <MDBRow>
                <span>
                  <MDBIcon fas icon="thumbs-up" className="me-2 mb-2" />
                  {commentData?.user?.total_like} upvotes
                </span>
              </MDBRow>
              <MDBRow>
                <span>
                  <MDBIcon fas icon="map-marker-alt" className="me-2 mb-2" />
                  Toronto, ON
                </span>
              </MDBRow>
            </div>
          </div>
          { commentData.parentId == null ? (
              <div className="p-2 w-100 d-flex flex-column justify-content-between">
                <div className="user-data">
                  <div className="me-3">
                    {commentData?.user?.image?.length != 0 ? (<img src={commentData?.user?.image} className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                      ):(
                        <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                      )}
                  </div>
                  <div className="mt-2">
                    <span style={{ textAlign:"left", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                      {commentData?.user?.userName}
                    </span>
                    <br/>
                    <span style={{ fontFamily: "Verdana,Arial,sans-serif", fontSize:"12px" }}>
                      {commentData?.createdAt?.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                      {formatTime(commentData?.createdAt?.substring(11, 16))}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="comment-r m-2">
                    <div className="comment--body">
                      <div className="d-flex flex-column justify-content-between">
                        {commentContent()}
                      </div>
                      {editing && (
                        <button className="update-btn" onClick={updateComment}>
                          update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <MDBRow>
                  <div className="d-flex justify-content-between !pr-0"> 
                    <CommentFooter
                      vote={vote}
                      setVoted={setVoted}
                      score={score}
                      setScore={setScore}
                      updateScore={updateScore}
                      commentData={commentData}
                      setReplying={setReplying}
                      setDeleting={setDeleting}
                      setDeleteModalState={setDeleteModalState}
                      setEditing={setEditing}
                      count={count}
                      setCount={setCount}
                      setUpdateComment={setUpdateComment}
                      typeUser={typeUser}
                      userId={userId}
                    />
                    <div className="d-flex jutify-content-inherit">
                      <MDBIcon className="me-1" onClick={toggleLike} fas icon="thumbs-up" id="thumicon" style={{color:thumbColor}} />
                      {(commentData?.no_likes == 0) ? (
                        ""
                      ):(
                        <div className="like-count">+{commentData?.no_likes}</div>
                      )}
                    </div>
                  </div>
                </MDBRow>
              </div>
            ):(
              <div className="p-2 w-100 d-flex flex-column justify-content-between">
                <div className="user-data">
                  <div className="me-3">
                  {commentData?.user?.image?.length != 0 ? (<img src={commentData?.user?.image} className="shadow-4 mb-2 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                  ):(
                    <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 mb-2 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                  )}
                  </div>
                  <div className="mt-2">
                    <span style={{ textAlign:"left", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                      {commentData?.user?.userName}
                    </span>
                    <br/>
                    <span style={{ fontFamily: "Verdana,Arial,sans-serif", fontSize:"12px" }}>
                      {commentData?.createdAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                      {formatTime(commentData?.createdAt.substring(11, 16))}
                    </span>
                  </div>
                </div>
              <div>
                <Wrote
                  commentData={commentData}
                />
                <div className="comment-r m-2">
                  <div className="comment--body">
                    {commentContent()}
                    {editing && (
                      <button className="update-btn" onClick={updateComment}>
                        update
                      </button>
                    )}
                  </div>
                </div>
                {/* {replying && (
                  <AddComment
                    buttonValue={"reply"}
                    commentData={commentData}
                    addComments={addReply}
                    replyingTo={commentData?.user?.email}
                    count={count}
                    setCount={setCount}
                    typeUser={typeUser}
                    userId={userId}
                    setDeleting={setDeleting}
                    setDeleteModalState={setDeleteModalState}
                    setUpdateComment={setUpdateComment}
                  />
                )} */}
                </div>
                <MDBRow>
                  <div className="d-flex justify-content-between !pr-0"> 
                    <CommentFooter
                      vote={vote}
                      setVoted={setVoted}
                      score={score}
                      setScore={setScore}
                      updateScore={updateScore}
                      commentData={commentData}
                      setReplying={setReplying}
                      setDeleting={setDeleting}
                      setDeleteModalState={setDeleteModalState}
                      setEditing={setEditing}
                      count={count}
                      setCount={setCount}
                      setUpdateComment={setUpdateComment}
                      typeUser={typeUser}
                      userId={userId}
                    />
                    <div className="d-flex jutify-content-inherit">
                      <MDBIcon className="me-1" onClick={toggleLike} fas icon="thumbs-up" id="thumicon" style={{color:thumbColor}} />
                      {(commentData?.no_likes == 0) ? (
                        ""
                      ):(
                        <div className="like-count">+{commentData?.no_likes}</div>
                      )}
                    </div>
                  </div>
                </MDBRow>
              </div>
              )}
          </div>
          {updatComment ? (
            <UpdateComment
              buttonValue={"reply"}
              addComments={addReply}
              replyingTo={commentData?.user?.userName}
              count={count}
              setCount={setCount}
              typeUser={typeUser}
              commentData={updatComment}
              setUpdateComment={setUpdateComment}
            />
          ) : (<></>)}
          <ReplyQuill
            buttonValue={"reply"}
            commentData={commentData}
            addComments={addReply}
            replyingTo={commentData?.user?.email}
            count={count}
            setCount={setCount}
            typeUser={typeUser}
            userId={userId}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setUpdateComment={setUpdateComment}
          />
        </div>


    </div>
  );
};

export default Reply;
