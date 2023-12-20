import React, { useState, useEffect } from "react";
import "../../css/thread-list.css";
import { isLogin } from "../../utils/isLogins";
import {
  MDBIcon,
} from "mdb-react-ui-kit";

import { NavLink, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import views from "../../assets/views.svg";
import arrow from "../../assets/icons/arrow.svg";
import { getSpaMasseuse, postTrending } from "../../axiosCalls";

const MostRecentForum = () => {
  const [title, setTitle] = useState("Trending Forum Threads");
  const navigate = useNavigate();
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [flag, setFlag] = useState(0);
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

    fetchData();
  }, [flag, currentPage]);

  console.log(totalForum)

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    deleteModalState
      ? document.body.classList.add("overflow--hidden")
      : document.body.classList.remove("overflow--hidden");
  }, [comments, deleteModalState]);


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

  const handleTrendingForum = (currentValue) => {
    navigate("/thread?id=" + currentValue.id);
  };


  return (
    <div className="border-t pt-2">
      <div className="m-2 text-base text-dark-gray font-bold md:text-xl">Trending Forum Threads</div>
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
                  <Link to={"/thread?id=" + currentValue.id} className = "topic-title text-base text-[#4f4f4f] hover:text-[#4f4f4f] hover:underline">
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
                  {currentValue?.lastPost?.user?.userName}
                </span>
                <br />
                <span className="text-xs text-[#999]">
                  {currentValue?.lastPost?.createdAt.substring(0, 10)}{" "}
                  {formatTime(currentValue?.lastPost?.createdAt.substring(11, 16))}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="thread-list--mobile mb-2">
          {filteredAllSpaMasseuse?.map((currentValue) => (
            <div key={`forum-mobile-${currentValue.id}`} className="thread-list-item border-y border-x-0 xs:border-x">
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
                  <span className="mr-2">{currentValue?.lastPost?.user?.userName}</span>
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
  );
};


export default MostRecentForum;
