import React, { useState, useEffect } from "react";
import "../../css/thread-list.css";
import { isLogin } from "../../utils/isLogins";

import { NavLink, useNavigate, Link } from "react-router-dom";

const SingleSpaView = (props) => {
  const navigate = useNavigate();

  // const goSingleSpa = (data) => {
  //   navigate("/single-spa?id=" + data.id, { state: { singleSpa: data, isTrending: true } });
  // };

  const changeComment = (commentStr) => {
    if(commentStr.length < 90) {
      return commentStr;
    } else {
      return(commentStr.slice(0,90) + " ...");
    }
  }
  return (
    <div className="flex flex-col border-x border-y max-xs:border-x-0 hover:shadow-[0_0px_16px_0px_rgba(0,0,0,0.2)] transform duration-700 h-80">
      <div className="cursor-pointer overflow-hidden shadow-sm h-4/5">
        {props.singleSpa.image == null ? "": <Link to={"/single-spa?id=" + props.singleSpa.id}><img className="mx-auto h-full max-w-full shadow-sm hover:duration-500 hover:scale-[1.2] object-cover w-full transform-gpu" src={props.singleSpa?.logo} alt="image description"></img></Link>}
      </div>
      <div className="p-[8px] md:p-[10px] xl:p-[12px]">
        <Link to={"/single-spa?id=" + props.singleSpa.id}><div className="font-semibold text-base mb-1 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer text-dark-gray">{props.singleSpa?.name}</div></Link>
        {props.type == "home" ? <div className="text-sm lg:text-xs xl:text-sm xs:text-xs sm:text-sm">{changeComment(props.singleSpa?.comment)}</div> : <><div className="text-sm lg:text-xs xl:text-sm xs:text-xs sm:text-sm">{changeComment(props.singleSpa?.comment)}</div><div className="text-[#1e6ed7] text-[13px]"><i class="fas fa-map-marker-alt mr-2"></i>{props.singleSpa?.city}</div></>}
      </div>
    </div>
  )
};

export default SingleSpaView;