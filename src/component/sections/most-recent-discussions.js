import React, { useState, useEffect } from "react";
import "../../css/thread-list.css";
import { isLogin } from "../../utils/isLogins";
import Parser from "html-react-parser";
import Pagination from "../../accounts/component/Pagination"
import TimeSinceCreation from "../TimeSinceCreation "
import '../../css/thread-list.css'
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBTextArea,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
} from "mdb-react-ui-kit";

import { NavLink, useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import commentIcon from "../../assets/icons/comment.svg";
import { getSpaMasseuse, postTrending } from "../../axiosCalls";
import IconDelete from "../../assets/images/icon-delete.svg";

const MostRecentDiscussion = (props) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const toggleShow = () => {
    setBasicModal(!basicModal);
    setDescription("");
    setTopic("");
    // setFormValue({});
  };
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  // const [flag, setFlag] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [allSpaMasseuseForum, setAllSpaMasseuseForum] = useState([]);

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [value, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1)
  const [forumtPerPage, setForumtPerPage] = useState(8)
  const [totalForum, setTotalForum] = useState(0)
  const [activeNumber, setActiveNumber] = useState(1);
  let lastForumtIndex;
  let firstForumIndex;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (currentPage === 0) {
  //       firstForumIndex = currentPage
  //       lastForumtIndex = currentPage
  //     } else {
  //       lastForumtIndex = currentPage * forumtPerPage
  //       firstForumIndex = lastForumtIndex - forumtPerPage
  //     }
  //     await getSpaMasseuse(currentPage-1, forumtPerPage).then((res) => {
  //       console.log(res.data);
  //       setAllSpaMasseuseForum(res.data.data.rows);
  //       setTotalForum(res.data.data.count);
  //     });
  //   };

  //   fetchData();
  // }, [currentPage]);

  useEffect(() => {
    let filter = {id:"all"};
    const fetchData = async () => {
      if (currentPage === 0) {
        firstForumIndex = currentPage
        lastForumtIndex = currentPage
      } else {
        lastForumtIndex = currentPage * forumtPerPage
        firstForumIndex = lastForumtIndex - forumtPerPage
      }
      await getSpaMasseuse(currentPage-1, forumtPerPage, filter).then((res) => {
        console.log(res.data);
        setAllSpaMasseuseForum(res.data.data.rows);
        setTotalForum(res.data.data.count);
      });
    };
    if(props?.name) {
      setTitle(props?.name);
    } else {
      setTitle("");
    }
    if(props?.type == "Spa") {
      filter={ spaId: props.spaId };
    }
    if(props?.type == "Masseuse") {
      filter={masseuseId: props.masseuseId}
    }
    console.log("FFFFFFFFilter::", filter);
    fetchData();
  }, [props, currentPage]);

  // const submitPost = async () => {
  //   if (topic && description) {
  //     await postTrending(3, topic, description).then((res) => {
  //       setFlag(flag + 1);



  //       toggleShow();
  //     });
  //   }
  // };



  console.log(totalForum)

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);



  const spaTime = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);

    const result = currentDate.getTime() - postDate.getTime();

    const finalResult = Math.ceil(result / (1000 * 3600 * 24));

    return finalResult;
  };

  const nOfThread = (comment) => {
    let threads = 0;
    comment.map((singleComment) => {
      if (singleComment.Replies.length > 0) {
        threads++;
      }
    });
    return threads;
  };

  function formatTime(timeString) {
    if(timeString == null) return;
    else {
      const [hourString, minute] = timeString.split(":");
      const hour = +hourString % 24;
      return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
    }
  }


  const filteredAllSpaMasseuse = allSpaMasseuseForum?.filter((item) => {
    return searchValue !== ""
      ? item.topic?.toLowerCase().includes(searchValue?.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchValue?.toLowerCase())
      : item;
  });
  const handleSearch = () => {
    setSearchValue(value);
  };

  const handleRegister = () => {
    if (isLogin()) {
      if(props.type == "Spa") {
        navigate("/single-spa-post", { state: { spaId: props.spaId, name: props.name } });
      }
      else {
        navigate("/post-trending");
      }
    } else {
      navigate("/login");
    }
  };

  const handleTrendingForum = (currentValue) => {
    navigate("/thread?id=" + currentValue.id);
    // if (currentValue?.sapId == null && currentValue?.masseuseId == null) {
    //   if (!isLogin()) {
    //     localStorage.setItem("singleSpa", JSON.stringify(currentValue));
    //     localStorage.setItem("isTrending", true);
    //   }
    //   navigate("/generic-thread", { state: { singleSpa: currentValue, isTrending: true } });
    // } else if (currentValue?.masseuseId == null ) {
    //   navigate("/single-spa?id=" + currentValue.spaId, { state: { singleSpa: currentValue, isTrending: true } });
    // } else {
    //   if (!isLogin()) {
    //     localStorage.setItem("singleSpa", JSON.stringify(currentValue));
    //     localStorage.setItem("isTrending", true);
    //   }
    //   navigate("/single-masseuse?id=" + currentValue.masseuseId, { state: { singleSpa: currentValue, isTrending: true } });
    // }
  };


  const handleKeypress = (e) => {
    if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
      handleSearch();
    }
  };


  return (
    <div className="w-full">
    <div className={`max-w-[1600px] mx-auto ${!props.name ? 'mt-[64px] sm:mt-[72px] lg:mt-[102px] md:mt-[94px] px-[0px] sm:px-[8px] lg:px-[16px]' : 'mt-[8px] border-t pt-[8px] lg:pt-[16px]'} `}>
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between pb-[8px] lg:pb-[8px] ">
          <div className="px-[8px] text-base pb-[8px] sm:pb-[0px] xs:text-xl text-dark-gray font-bold md:text-xl flex items-center">
            {title}
          </div>
          <div className="flex justify-end h-8">
            {/* <div className="m-2 text-base text-dark-gray font-bold md:text-xl">
              {title}
            </div> */}
            <button
              type="button"
              className=" bg-[#c8175d] text-white text-sm px-3 rounded-sm h-8 w-full"
              // className="bg-[#c8175d] text-white"
              // className="btn-trending-post float-right"
              onClick={handleRegister}
              // style={{maxWidth:"150px"}}
            >
              <div>+ Post New Thread</div>
            </button>
          </div>
        </div>
          <div className="thread-list mb-4 border-x">
            <div className="grid grid-cols-12 bg-[#4f4f4f33] border text-dark-gray mt-2">
              <div className="col-span-8 p-2">
                Topic
              </div>
              {/* <div className="col-span-1 p-2 text-center">
                Likes
              </div> */}
              <div className="col-span-1 p-2 text-center">
                Replies
              </div>
              <div className="col-span-1 p-2 text-center">
                Views
              </div>
              <div className="col-span-2 p-2">
                Last post
              </div>
            </div>
            {filteredAllSpaMasseuse?.map((currentValue) => (
              <div key={`forum-${currentValue.id}`} className="grid grid-cols-12 border-b">
                <div className="col-span-8 p-2">
                  <span
                    // onClick={() => handleTrendingForum(currentValue)}
                    className="cursor-pointer"
                  >
                    <Link to={"/thread?id=" + currentValue.id} className="topic-title text-base text-[#4f4f4f] hover:text-[#4f4f4f] hover:underline">
                      {currentValue.topic}
                    </Link>
                  </span>
                  <br />
                  <span className=" text-xs text-[#999]">
                    <span className="mr-4">
                      {currentValue?.user?.userName}
                    </span>
                    {currentValue.createdAt.substring(0, 10)}{" "}
                    {formatTime(currentValue.createdAt.substring(11, 16))}
                  </span>
                </div>
                {/* <div className="col-span-1 p-2 text-center ">
                  <span className="cursor-pointer text-sm">
                    [4]
                  </span>
                </div> */}
                <div className="col-span-1 p-2 text-center ">
                  <span className="cursor-pointer text-sm">
                    {currentValue.no_comments + " "}
                  </span>
                </div>
                <div className="col-span-1 p-2 text-center ">
                  <span className="viewsCount-comment cursor-pointer text-sm">
                    {currentValue.views}
                  </span>
                </div>
                <div className="col-span-2 p-2 pl-4">
                  <span className="cursor-pointer text-sm">
                    {currentValue?.lastPost == null ? currentValue?.user?.userName : currentValue?.lastPost?.user?.userName}
                  </span>
                  <br />
                  <span className="text-xs text-[#999]">
                    {currentValue?.lastPost ==  null ? 
                      (
                        <>
                          {currentValue.createdAt.substring(0, 10)}{" "}
                          {formatTime(currentValue.createdAt.substring(11, 16))}
                        </>
                      ):
                      (
                        <>
                          {currentValue?.lastPost?.createdAt.substring(0, 10)}{" "}
                          {formatTime(currentValue?.lastPost?.createdAt.substring(11, 16))}
                        </>
                      )        
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="thread-list--mobile mb-2">
            {filteredAllSpaMasseuse?.map((currentValue) => (
              <div key={`forum-mobile-${currentValue.id}`} className="thread-list-item">
                <div className="p-2">
                  <div
                    // onClick={() => handleTrendingForum(currentValue)}
                    className="cursor-pointer"
                  >
                    <Link to={"/thread?id=" + currentValue.id} className="topic-title text-base">
                      {currentValue.topic}
                    </Link>
                  </div>
                  <div className=" text-xs text-[#999]">
                    <span className="mr-2">
                      {currentValue?.lastPost == null ? currentValue?.user?.userName : currentValue?.lastPost?.user?.userName}
                    </span>
                    <span>
                      {currentValue.createdAt.substring(0, 10)}{" "}
                      {formatTime(currentValue.createdAt.substring(11, 16))}
                    </span>
                  </div>
                  <div>
                    <span className="mr-4 text-xs text-[#999]">
                      <MDBIcon fas icon="comment-alt" className="mr-2" />
                      <span className=" cursor-pointer text-sm">
                        {currentValue.no_comments + " "}
                      </span>
                    </span>
                    <span className="text-xs text-[#999]" >
                      <i className='fas fa-align-left -rotate-90 mr-2'></i>
                      <span className="viewsCount-comment cursor-pointer text-sm">
                        {currentValue.views}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Pagination activeNumber={activeNumber} setActiveNumber={setActiveNumber} currentPage={currentPage} totalForum={totalForum} setCurrentPage={setCurrentPage} forumtPerPage={forumtPerPage} />
    </div>
    </div>
  );
};
export default MostRecentDiscussion;
