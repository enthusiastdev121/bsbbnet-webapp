/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { Context } from "../../context/dataContext";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import { useCallback } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import "../../css/threadPost.css";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import {
  getSpaComment,
  ForumDetail,
  getSingleUser,
  deleteSpaForum,
  getSingleThread,
} from "../../axiosCalls";
// import ReplyContainer from './ReplyContainer';
import { commentPostedTime } from "../../utils";
import ReplyContainer from "../Comment/ReplyContainer";
import { toast } from "react-toastify";
import { async } from "q";
const GenericThread = (props) => {
  const location = useLocation();
  const search = useLocation().search;
  const navigate = useNavigate();

  const threadId = new URLSearchParams(search).get("id");
  const {
    setCommentOfType
  } = useContext(Context);

  const [title, setTitle] = useState("");
  const [typeUser, setTypeUser] = useState("generic");
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(true);
  const [time, setTime] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [commentInfo, setCommentInfo] = useState([]);
  const [count, setCount] = useState(0);
  const [callViewOnce, setCallViewOnce] = useState();
  const [userData, setUserData] = useState([]);
  const [singleThread, setSingleThread] = useState([]);


  useEffect(() => {
    setCommentOfType("init");
    const getSingleTreadFunc = async () => {
      const res = await getSingleThread(threadId);
      setSingleThread(res.data.data);
      setUserData(res.data.data.user);
    }
    const getForumDetail = async () => {
      await ForumDetail(threadId, "generic");
    };
    getSingleTreadFunc();
    getForumDetail();
  }, []);
  const updateUserData = useCallback(userdata => {
    setUserData(userdata);
  }, [userData])

  useEffect(() => {
    const getComment = async () => {
      const res = await getSpaComment(threadId);
      console.log(res.data.data);
      setCommentInfo(res.data.data);
    };

    getComment();
  }, [count]);

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
  
  const handleForumDelete = async () => {

    const res = await deleteSpaForum(threadId, "generic");
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
        navigate("/forum");
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


  // add replies
  let updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    updateComments.replies = replies;
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


  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  const formatTime = (timeString) => {
    if(timeString == null) return;
    else {
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }
  };

  localStorage.removeItem("forumId");
  localStorage.setItem("forumId", threadId);

  const handleBack = () => {
    navigate("/");
  };
  const handleBackHome = () => {
    navigate("/");
  };


  return (
    <div className="w-full">
      <div className="max-w-[1600px] mx-auto mt-[72px] md:mt-[94px]">
        {/* <MDBBreadcrumb className="mt-[56px] md:mt-[78px]">
          <MDBBreadcrumbItem className="breadcrumb-item-text">
            <a onClick={handleBackHome} style={{ cursor: "pointer" }}>
              Home
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem className="breadcurm-active">
            {"Trending on "+ singleThread.topic}
          </MDBBreadcrumbItem>
        </MDBBreadcrumb> */}
        {/* <MDBCol md={12}> */}
          <div
            style={{
              background: "#FFFFFF",
              // boxShadow: "2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)",
            }}
          >
            <div className="panel-head px-[12px]">
              <div className="panelHeading">
                <div md={12} className="spaThread-title ml-1">{singleThread.topic}</div>
              </div>
              <div style={{ marginBottom:"12px", border:"1px solid #e2e2e2"}}>              
                <div className="thread--header">
                  <span className="comment-posted-time" style={{ color: "#fff", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600" }}>
                    {singleThread?.createdAt?.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                    {formatTime(singleThread?.createdAt?.substring(11, 16))}
                  </span>
                </div>
                <div className="relative right-3">
                  {singleThread.userId == localStorage.getItem("userID") ||
                  localStorage.getItem("userID") == 10 ? (
                    <Dropdown className="float-right">
                      <Dropdown.Toggle as={CustomToggle}>
                      <div className="flex text-lg">...</div>
                      </Dropdown.Toggle>
            
                      <Dropdown.Menu className="!mt-1 -translate-x-[10px]  min-[1730px]:-translate-x-[130px] !translate-y-[20px]" style={{padding:"0px", borderRadius:"8px"}}>
                        <Dropdown.Item onClick={handleForumDelete} eventKey="2" style={{padding:"8px", paddingLeft:"16px"}}><i class="far fa-trash-alt mr-3"></i>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </div>
                <div className="user-data pt-2">
                  <div className="me-3 ms-2">
                    {/* <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="shadow-4" alt="Avatar" width={60} /> */}
                    <div>
                        {singleThread?.user?.image?.length != 0 ? (<img src={singleThread?.user?.image} className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                        ):(
                          <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 max-h-[60px] max-w-[60px] object-cover" alt="Avatar" width={60} />
                        )}
                      </div>
                  </div>
                  <div className="mt-2">
                    <span style={{ textAlign:"left", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                      {singleThread?.user?.userName}
                    </span>
                    <br/>
                    <span style={{ fontFamily: "Verdana,Arial,sans-serif", fontSize:"12px" }}>
                      {singleThread?.createdAt?.substring(0, 10)} &nbsp;&nbsp;&nbsp;
                      {formatTime(singleThread?.createdAt?.substring(11, 16))}
                    </span>
                  </div>
                </div>
                <div className="thread-body-response">
                  <div style={{ backgroundColor:"#f6f7f8", width: 250 }} className="p-3 thread-info">
                    <div>
                      <div>
                        {singleThread?.user?.image?.length != 0 ? (<img src={singleThread?.user?.image} className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                        ):(
                          <img src="https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" className="shadow-4 mb-2 max-h-[120px] max-w-[120px] object-cover" alt="Avatar" width={120} />
                        )}
                      </div>
                      <p style={{ marginBottom:'0px', fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
                        {singleThread?.user?.userName}
                      </p>
                    </div>
                    <hr />
                    <div padding="auto" width="100%">
                      <MDBRow>
                        <span>
                          <MDBIcon far icon="calendar" className="me-2 mb-2"/>
                          {singleThread?.user?.createdAt?.substring(0, 10)}
                        </span>
                      </MDBRow>
                      <MDBRow>
                        <span>
                          <MDBIcon fas icon="file" className="me-2 mb-2" />
                          {singleThread?.user?.total_post} posts
                        </span>
                      </MDBRow>
                      <MDBRow>
                        <span>
                          <MDBIcon fas icon="thumbs-up" className="me-2 mb-2" />
                          {userData?.total_like} upvotes
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
                        {/* <MDBRow className="mb-3 ms-2">
                          <span style={{fontSize:"20px", fontWeight:"600"}}>{singleThread.topic}</span>
                        </MDBRow> */}
                      <MDBRow>
                        <span className="min-[769px]:!pl-6" style={{ color: "#322d2d", fontSize: "17px", padding:"12px" }}>
                          {singleThread?.description? Parser(singleThread?.description): ""}
                        </span>
                      </MDBRow>
                    </div>
                    <div className="d-flex justify-content-between pl-3">
                      {/* <div className="hidden md:block"> */}
                        {/* <span className="daytime" style={{fontSize:"14px", color:"#4f4f4fa8"}}> {spaTime(singleSpa?.createdAt)} day ago</span> */}
                      {/* </div> */}
                      <div className="pt-1">
                        <div>
                          <button className="reply-group mt-1 me-2 reply-btn" onClick={()=>{setCommentOfType("thread")}}>
                            <MDBIcon fas icon="reply" className='me-1' style={{ color: "#999", cursor: "pointer" }} id="replyicon" />
                            <span id="reply-text" style={{fontSize:"13px", color: "#999", cursor: "pointer" }}>Reply</span>
                          </button>
                        </div> 
                        <div className="block md:hidden reply-bar pl-1">{commentInfo.length}&nbsp;Replies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReplyContainer
              key={threadId}
              commentData={commentInfo}
              userData={userData}
              updateUserData={updateUserData}
              updateScore={updateScore}
              commentPostedTime={commentPostedTime}
              addReply={addReply}
              editComment={editComment}
              deleteComment={deleteComment}
              setDeleteModalState={setDeleteModalState}
              setCount={setCount}
              count={count}
              typeUser={typeUser}
              userId={singleThread.userId}
            />
          </div>
        {/* </MDBCol> */}
      </div>
      <br />
    </div>
  );
};
export default GenericThread;
