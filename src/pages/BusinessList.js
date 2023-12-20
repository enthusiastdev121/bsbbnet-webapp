import React, { useState, useEffect, Suspense, lazy } from "react";
import "../css/thread-list.css";
import { isLogin } from "../utils/isLogins";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllSpas } from "../axiosCalls";
// import SingleSpaView from "./SingleSpaView";
const SingleSpaView = lazy(() => import('../component/spa/SingleSpaView.js'));

const BusinessList = () => {
  const navigate = useNavigate();
  const [allSpa, setAllSpa] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const numbers = [1,2,3,4,5,6,7,8];
  useEffect(() => {
    const fetchData = async () => {
    await getAllSpas()
      .then((res) => {
        setAllSpa(res.data.data);
        setIsLoading(true);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }
  fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* <div className="max-w-[1600px] mx-auto p-[0px] sm:p-[8px] sm:pr-[14px] min-[769px]:pr-[5px] xl:p-[16px]"> */}
      <div className="max-w-[1600px] mx-auto p-[0px] xs:p-[8px] xl:p-[16px]">
        <div className="grid grid-cols-1 gap-x-2 gap-y-2 mb-[8px] pt-[64px] xs:grid-cols-2 sm:grid-cols-2 md:pt-[86px] lg:grid-cols-4 xl:gap-x-4 xl:gap-y-4 xl:mb-[16px]">

          { isLoading && allSpa.length != 0? allSpa.map((singleSpa) => (
            <Suspense fallback={<Loading num={singleSpa?.id}/>}>
              <SingleSpaView type={"all"} singleSpa={singleSpa} />
            </Suspense>
          )): numbers.map((num) => <Loading num={num} />)}
        </div>
      </div>
    </div>
  )
}
const Loading = (props) => {
  return (
    <div key={`load-${props.num}`}  className=" animate-pulse flex space-x-4">
      <div className="flex flex-col border-x border-y max-xs:border-x-0 h-80 w-full hover:shadow-[0_0px_10px_0px_rgba(0,0,0,0.25)]">
        <div className="cursor-pointer overflow-hidden shadow-sm h-60 flex items-center justify-center">
          {/* <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"> 
          </div> */}
          <i class='fa fa-image text-7xl text-[#666565]'></i> 
        </div>
        <div className="px-3 py-2">
          <div className=" h-5 bg-[#666565] rounded-xl mb-2.5 mt-1"></div>
          <div className="h-2 bg-[#7e7d7d] rounded mb-2"></div>
          <div className="h-2 bg-[#7e7d7d] w-3/4 rounded"></div>
        </div>
      </div>
    </div>
  )
}


export default BusinessList;
