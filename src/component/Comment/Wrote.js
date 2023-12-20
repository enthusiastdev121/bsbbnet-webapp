import CommentVotes from "./CommentVotes";
import CommentBtn from "./CommentBtn";
import React, { useState, useEffect } from "react";
import { getCommentById } from "../../axiosCalls";
import Parser from "html-react-parser";

const Wrote = ({
    commentData
}) => {
  const [parentInfo, setParentInfo] = useState([]);
  useEffect(() => {
    console.log(commentData);
    const parentDetail = async () => {
      const res = await getCommentById(commentData.parentId);
      console.log(res);
      setParentInfo(res.data.data);
    };
    parentDetail();
	}, []);



  return (
    <div className="comment">
        <span className="username mb-4 mt-1" style={{ color: "#3B71CA", fontFamily: "Verdana,Arial,sans-serif", fontWeight: "600", fontSize: "16px" }}>
          {parentInfo?.user?.userName} <span style={{color: "rgb(70, 58, 58)", fontFamily: "Verdana,Arial,sans-serif", fontsize:"14px", fontWeight:"400"}}><i>wrote:</i></span>
        </span>
        <br />
        {parentInfo.length != 0 ? <div style={{marginBottom: "-15px", marginTop: "8px"}}>{Parser(parentInfo.comment)}</div> : <></> }
    </div>
  );
};

export default Wrote;
