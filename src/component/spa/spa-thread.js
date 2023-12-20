/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import "../../css/threadPost.css";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/dataContext";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { ReactComponent as IconEdit } from "../../assets/images/icon-edit.svg";
import Parser from "html-react-parser";
import TimeSinceCreation from "../TimeSinceCreation "
import {
  getSpaComment,
  ForumDetail,
  getSingleUser,
  deleteSpaForum,
} from "../../axiosCalls";
// import ReplyContainer from './ReplyContainer';
import { commentPostedTime } from "../../utils";
import ReplyContainer from "../Comment/ReplyContainer";
import { toast } from "react-toastify";
const SpaTreadDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { singleSpa, isTrending, name, locationAddress, phoneNumber } = location.state;
  const {
    setCommentOfType
  } = useContext(Context);


  const [title, setTitle] = useState("");
  const [typeUser, setTypeUser] = useState("spa");
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(true);
  const [time, setTime] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [commentInfo, setCommentInfo] = useState([]);
  const [count, setCount] = useState(0);
  const [Views, setViews] = useState();
  const [callViewOnce, setCallViewOnce] = useState();


  useEffect(() => {
    const getForumDetail = async () => {
      const res = await ForumDetail(singleSpa.id, "SpaForum");
      setViews(res.data.data[0].views);
    };
    getForumDetail();
  }, [callViewOnce]);

  useEffect(() => {
    setTitle(
      isTrending
        ? "Trending Threads on " + singleSpa.topic
        : "Most Recent Threads on " + singleSpa.topic
    );
    const getComment = async () => {
      const res = await getSpaComment(singleSpa.id);
      console.log(res.data.data);
      setCommentInfo(res.data.data);
    };

    getComment();
  }, [count]);

  useEffect(() => {
    setCommentOfType("init");
  }, []);



  const handleForumDelete = async () => {
    const res = await deleteSpaForum(singleSpa.id, "SpaForum");
    console.log(res);
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
      if (isTrending === true) {
        navigate("/");
      } else {
        navigate("/spa");
      }
    }
  };

  // update score
  let updateScore = (score, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  // add comments
  let addComments = (newComment) => {
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  // add replies
  let updateReplies = (replies, id) => {
    console.log("updateReplies");
    console.log(replies, id);
    let updatedComments = [...comments];
    updateComments.replies = replies;
    // updatedComments.forEach((data) => {
    // 	if (data.id === id) {
    // 		data.replies = [...replies];
    // 	}
    // });
    updateComments(updatedComments);
  };

  // edit comment
  let editComment = (content, id, type) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment.replies.forEach((data) => {
          if (data.id === id) {
            data.content = content;
          }
        });
      });
    }

    updateComments(updatedComments);
  };

  // delete comment
  let commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    let updatedReplies = [];

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment.replies.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
  };
  const addReply = (newReply) => {
    console.log(newReply);
    let tempComment = [...comments];
    let replies = tempComment[0].replies;
    replies.push(newReply);
    updateReplies(replies, tempComment[0].id);
    setReplying(false);
  };
  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : comments.id;
    commentDelete(finalId, finalType, comments.id);
    setDeleting(false);
  };

  const nOfThread = (comment) => {
    let threads = 0;
    comment?.map((singleComment) => {
      if (singleComment.Replies.length > 0) {
        threads++;
      }
    });
    return threads;
  };

  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  const formatTime = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  };

  localStorage.removeItem("forumId");
  localStorage.setItem("forumId", singleSpa?.id);

  const handleBack = () => {
    if (isTrending === true) {
      navigate("/");
    } else {
      navigate("/spa");
    }
  };
  const handleBackHome = () => {
    navigate("/");
  };


  return (
    <>
      <br />
      <MDBRow className="discussion-section panel-ro mt-5p ">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem className="breadcrumb-item-text">
            <a onClick={handleBackHome} style={{ cursor: "pointer" }}>
              Home
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem className="breadcrumb-item-text">
            <a onClick={handleBack} style={{ cursor: "pointer" }}>
              {isTrending ? "Trending" : "Most Recent Spa Discussions"}
            </a>
          </MDBBreadcrumbItem>

          <MDBBreadcrumbItem className="breadcurm-active">
            {singleSpa.topic}
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
        <MDBCol md={12}>
          <MDBRow
            style={{
              borderRadius: "30px",
              // padding: '0 10% 10% 10%',
              background: "#FFFFFF",
              boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <MDBCol md={12} className="panel-head">
              <MDBRow className="panelHeading">
                <MDBCol md={12} className="spaThread-title">{title}</MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={12} className="flex daysCount-flex pt-3" style={{
                  borderBottom: "3px solid lightgrey",
                  paddingBottom: "5px",
                  marginBottom:"12px"
                }} >
                  <span className="comment-heading spaThread-title">
                    {name} - {locationAddress}, {phoneNumber}
                  </span>
                </MDBCol>
              </MDBRow>
              <div style={{ marginBottom:"12px"}}>                
                <div className="thread--header">
                  <span className="comment-posted-time" style={{ color: "#fff", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600" }}>
                    {singleSpa?.createdAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                    {formatTime(singleSpa?.createdAt.substring(11, 16))}
                  </span>
                </div>
                <div className="user-data">
                  <div className="me-3 ms-2">
                    {singleSpa?.user?.image?.length != 0 ? (<img src={singleSpa?.user?.image} className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                      ):(
                        <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                      )}
                  </div>
                  <div className="mt-2">
                    <span style={{ textAlign:"left", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                      {singleSpa?.user?.userName}
                    </span>
                    <br/>
                    <span style={{ fontFamily: "Verdana,Arial,sans-serif", fontSize:"12px" }}>
                      {singleSpa?.createdAt.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                      {formatTime(singleSpa?.createdAt.substring(11, 16))}
                    </span>
                  </div>
                </div>
                <div className="thread-body-response">
                  <div style={{ backgroundColor:"#f6f7f8", width: 250 }} className="p-3 thread-info">
                    <div>
                      <div>
                        {singleSpa?.user?.image?.length != 0 ? (<img src={singleSpa?.user?.image} className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                        ):(
                          <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                        )}
                      </div>
                      <p style={{ marginBottom:'0px', fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                        {singleSpa?.user?.userName}
                      </p>
                    </div>
                    <hr />
                    <div padding="auto" width="100%">
                      <MDBRow>
                        <span>
                        <MDBIcon far icon="calendar" className="me-2 mb-2"/>
                          {singleSpa?.user?.createdAt?.substring(0, 10)}
                        </span>
                      </MDBRow>
                      <MDBRow>
                        <span>
                          <MDBIcon fas icon="file" className="me-2 mb-2" />
                          {singleSpa?.user?.total_post} posts
                        </span>
                      </MDBRow>
                      <MDBRow>
                        <span>
                          <MDBIcon fas icon="thumbs-up" className="me-2 mb-2" />
                          {singleSpa?.user?.total_like} upvotes
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
                  <div className="p-2 w-100 d-flex flex-column justify-content-between">
                    <div>
                      <MDBRow className="mb-3 ms-2">
                        <span style={{fontSize:"20px", fontWeight:"600"}}>{singleSpa.topic}</span>
                      </MDBRow>
                      <MDBRow className="ms-2">
                        <p style={{ color: "#322d2d", fontSize: "17px" }}>
                          {Parser(singleSpa.description)}
                        </p>
                      </MDBRow>
                    </div>
                    <div className="d-flex justify-content-between" style={{borderTop:"1px solid #e2e2e2"}}>
                      <div className="mt-1">
                        {/* <span className="daytime" style={{fontSize:"14px", color:"#4f4f4fa8"}}> {spaTime(singleSpa?.createdAt)} day ago</span> */}
                      </div>
                        <span>
                          <button className="reply-group mt-1 me-2 reply-btn" onClick={()=>{setCommentOfType("thread")}}>
                            <MDBIcon fas icon="reply" className='me-1' style={{ color: "#999", cursor: "pointer" }} id="replyicon" />
                            <span id="reply-text" style={{fontSize:"13px", color: "#999", cursor: "pointer" }}>Reply</span>
                          </button>
                          {singleSpa.userId == localStorage.getItem("userID") ||
                            localStorage.getItem("userID") == 10 ? (
                            <>
                              {/* <button
                                className={"reply-group reply-btn"}
                              >
                                <IconEdit id="edit-icon" style={{opacity: "0.7"}} />
                                <span className="ms-1" id="reply-text" style={{fontSize:"13px", color: "#999", marginRight:"10px" }}>Edit</span>
                              </button> */}
                              <button
                                className="reply-group reply-btn"
                                onClick={handleForumDelete}
                                style={{ cursor: "pointer" }}
                              >
                                <IconDelete id="delete-icon" style={{opacity: "0.7"}} />
                                <span className="ms-1" id="reply-text" style={{fontSize:"13px", color: "#999" }}>Delete</span>
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </MDBCol>
            <div className="reply-bar">{commentInfo.length}&nbsp;Replies</div>
            <ReplyContainer
                key={singleSpa?.id}
                commentData={commentInfo}
                updateScore={updateScore}
                commentPostedTime={commentPostedTime}
                addReply={addReply}
                editComment={editComment}
                deleteComment={deleteComment}
                setDeleteModalState={setDeleteModalState}
                setCount={setCount}
                count={count}
                typeUser={typeUser}
                userId={singleSpa.userId}
              />
          </MDBRow>
        </MDBCol>
      </MDBRow>
      <br />
    </>
  );
};
export default SpaTreadDetails;
