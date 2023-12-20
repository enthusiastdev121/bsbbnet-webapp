import React, { useEffect, useState, useRef } from "react";
import "../../css/signle-spa.css";
import heroBg from "../../assets/hero-bg.png";
import bg3 from "../../assets/spa-bannerbg.png";
import { baseUrl } from "../../utils/isLogins";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "../../css/single-page.css";
import { ScrollTo } from "react-scroll-to";
import Carousel from 'react-bootstrap/Carousel';

import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import Gallery from "../sections/gallery";
import SingleMostRecentSpaDiscussion from "./single-most-recent-spa-discussions";
import SingleSpaDiscussionReviews from "./single-spa-discussion-reviews";
import { getsingalSpa, spaChildId, getsingalMasseuse } from "../../axiosCalls";
import { useLocation } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

import "../../css/style.css";
// import "./style.css";

import { Grid, Pagination, Parallax, EffectCards } from "swiper";

import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";

import street1 from "../../assets/street1.png";
import street2 from "../../assets/street2.png";
import street3 from "../../assets/street3.png";
import street4 from "../../assets/street4.png";

import map from "../../assets/map.png"

import sms from "../../assets/sms.png"
import facebook from "../../assets/facebook.png"
import website from "../../assets/website.png"
import twitter from "../../assets/twitter.png"
import wechat from "../../assets/wechat.png"
import mail from "../../assets/mail.png"
import message from "../../assets/message.png"
import instagram from "../../assets/instagram.png"

import MostRecentDiscussion from "../sections/most-recent-discussions";
import { right } from "@popperjs/core";

export default function SingleSpa() {
  const [loading, setLoading] = useState(true);
  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= spa[0]?.image?.length) {
      setLoading(false);
    }
  };
  const url = baseUrl();
  const navigate = useNavigate();
  const myRef = useRef();
  const [spa, setspa] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [massuseId, setMassuseId] = useState();
  const [spaChilds, setSpaChilds] = useState();
  const search = useLocation().search;
  const location = useLocation();
  const spaid = new URLSearchParams(search).get("id");

  useEffect(() => {
    const fetchSpa = async () => {
      await getsingalSpa(spaid).then((res) => {
        console.log(res);
        setspa(res.data.data);
      });

      // myRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const fetchStaffChildId = async () => {
      await spaChildId(spaid).then((res) => {
        setMassuseId(res?.data?.data[0]?.masseuseId);
        getsingalMasseuse(res?.data?.data[0]?.masseuseId).then((res) => {
          setSpaChilds(res.data.data[0].name);
        });
      });
    };

    fetchSpa();
    fetchStaffChildId();
  }, []);
  const formatTime = (timeString) => {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  console.log(spa[0]?.spaMessauses);

  const handleComment = (value) => {
    if (value) {
      return true;
    } else {
      return false;
    }
  };

  const handlePhoneClick = (phoneNUmber) => {
    window.location.href = `tel:${phoneNUmber}`;
  };

  return (
    <>
      {spa?.length == 0 ? (
        <div style={{ paddingTop: "71vh" }}></div>
      ) : (
        <>
          <div
            className="hero-section section overlay"
            // style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="bg-single-spa">
              <div className="max-w-[1600px] mx-auto">
                
                <div className="md:mt-24 max-md:mt-14 md:p-4 md:py-[8px]" style={{display:"grid"}}>
                  {/* <div className=" ">
                    <MDBBreadcrumb>
                      <MDBBreadcrumbItem className="breadcrumb-item-text">
                        <a href="/spa">Spa</a>
                      </MDBBreadcrumbItem>

                      <MDBBreadcrumbItem className="breadcurm-active">
                        {console.log(spa)}
                        {spa[0]?.name}
                      </MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </div> */}
                  {/* className="flex w-full h-full md:col-span-3" */}
                      
                    <div className="flex md:w-full max-md:w-full">
                      <Swiper
                        slidesPerView={"auto"}
                        //spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        parallax={true}
                        modules={[Pagination, Parallax]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <img
                            src={s1}
                            alt="First slide"
                            className=" w-full mt-auto md:h-96"                            
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={s2}
                            alt="Second slide"
                            className=" w-full mt-auto md:h-96"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            src={s3}
                            alt="Third slide"
                            className=" w-full mt-auto md:h-96"
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>        
                    
                    <div className="md:hidden block">
                      <div className="p-2 border-b-2 border-[#eaeaed] md:text-center md:items-center md:mt-14">
                        <span className=" text-black font-bold text-base md:text-xl">{spa[0]?.name}</span><br />
                        <span className="text-[#4f4f4f] text-sm">{spa[0]?.comment}</span><br />
                        <i class="fas fa-map-marker-alt ml-2 my-auto text-[#4f4f4f]"></i>
                        <span className=" text-[#4f4f4f] ml-2 text-[13px]">{spa[0]?.city}</span>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="p-2 border">
                        <span className=" text-black font-bold text-xl">{spa[0]?.name}</span><br />
                        <span className="text-[#4f4f4f] text-sm">{spa[0]?.comment}</span><br />
                        <i class="fas fa-map-marker-alt ml-2 my-auto text-[#4f4f4f]"></i>
                        <span className=" text-[#4f4f4f] ml-2 text-md text-[13px]">{spa[0]?.city}</span>
                      </div>
                    </div>
                </div>

                <div className="grid-cols-1 md:grid-cols-2 md:gap-4 md:pt-[8px] md:px-4" style={{display:"grid"}} >
                  
                  <div className="md:border">

                    <div className=" grid grid-cols-4 grid-rows-2 max-[498px]:gap-6 max-[498px]:px-3.5 max-[498px]:grid-cols-4 min-[500px]:grid-cols-8 min-[500px]:grid-rows-1 min-[768px]:grid-cols-4 min-[768px]:grid-rows-2 min-[768px]:gap-4 min-[1025px]:grid-cols-8 min-[1025px]:grid-rows-1 border-b md:py-4 max-[767px]:pt-6 max-[767px]:pb-6 min-[1025px]:pt-7 min-[1025px]:pb-7 min-[1025px]:px-4">
                      <Link onClick={() => handlePhoneClick(spa[0]?.phone)} ><img src={sms} width={50} className="mx-auto" /></Link>
                      <Link onClick={() => handlePhoneClick(spa[0]?.phone)} ><img src={message} width={50} className="mx-auto" /></Link>                 
                      <Link to="https://www.strengthandbalance.ca/" ><img src={website} width={50} className="mx-auto" /></Link>
                      <Link to="mailto:" ><img src={mail} width={50} className="mx-auto" /></Link>
                      <Link to="https://web.wechat.com/uklccp?lang=en_US&t=v2/index" ><img src={wechat} width={50} className="mx-auto" /></Link>
                      <Link to="https://publish.twitter.com/" ><img src={twitter} width={50} className="mx-auto" /></Link>
                      <Link to="https://www.facebook.com/" ><img src={facebook} width={50} className="mx-auto" /></Link>
                      <Link to="https://www.instagram.com/" ><img src={instagram} width={50} className="mx-auto" /></Link>
                    </div>

                    <div className=" md:border-b border-[#eaeaed] flex justify-between">
                      <div className="flex flex-row">
                        <i class="fas fa-map-marker-alt my-auto ml-4 text-[#c8175d] text-2xl max-md:text-xl"></i>
                        <div className=" ml-4 my-auto">
                          <a
                            href={
                              "https://www.google.com/maps/place/" +
                              spa[0]?.location
                            }
                            target="_blank"
                            className="signle-spa-link"
                          >
                            <span className="view-detail min-[1025px]:text-sm max-[350px]:text-sm max-[1025px]:text-sm max-[1025px]:py-2">
                              
                              {spa[0]?.location}
                            </span>
                            {/* <br /><span className=" text-xs text-[#4f4f4f]">800.0m</span> */}
                          </a>
                        </div>
                      </div>
                      <div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.5770263669983!2d-114.0598199!3d51.042432399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53717002323320ed%3A0x32bcfcd2cd1e8d5a!2s214%2011%20Ave%20SE%2C%20Calgary%2C%20AB%20T2G%200X8%2C%20Canada!5e0!3m2!1sen!2sus!4v1678665966092!5m2!1sen!2sus" className="float-right md:max-w-[130px] max-h-[100px] max-[1025px]:hidden max-md:hidden"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                        {/* <img src={map} className="float-right max-w-[90px] md:max-w-[120px] max-[1025px]:hidden max-md:hidden" /> */}
                      </div>
                    </div>
                    <div className="max-md:border-b border-[#eaeaed]">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.5770263669983!2d-114.0598199!3d51.042432399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53717002323320ed%3A0x32bcfcd2cd1e8d5a!2s214%2011%20Ave%20SE%2C%20Calgary%2C%20AB%20T2G%200X8%2C%20Canada!5e0!3m2!1sen!2sus!4v1678665966092!5m2!1sen!2sus" className=" mt-2 md:hidden block w-full max-md:h-[270px]" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
                      {/* <img src={map} className=" mt-2 md:hidden block w-full max-h-[270px]" /> */}
                    </div>
                    
                  </div>
                  
                  <div className=" md:border">
                    <div className="max-md:border-b border-[#eaeaed]">
                        
                        {/* <i class="far fa-clock ml-4 mt-2 text-[#c8175d] text-xl min-[910px]:text-5xl md:pt-4"></i> */}

                        <div className="flex justify-evenly w-full mt-10">
                          <div className= "text-left w-[135px] leading-8">
                            <span class="text-sm font-light">
                              <b>Saturday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[5]?.sat?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[5]?.sat?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[5]?.sat?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm">
                              <b>Sunday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[6]?.sun?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm">
                              <b>Monday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[0]?.mon?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[0]?.mon?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[0]?.mon?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm ">
                              <b>Tuesday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[1]?.tue?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[1]?.tue?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[1]?.tue?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm">
                              <b>Wednesday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[2]?.wed?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[2]?.wed?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[2]?.wed?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm">
                              <b>Thursday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[3]?.thu?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[3]?.thu?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[3]?.thu?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full">
                          <div className= "text-left w-[135px] leading-8 font-light">
                            <span class="text-sm">
                              <b>Friday</b>
                            </span>
                          </div>
                          <div className="text-left w-[135px]">
                            <span class="text-sm leading-8 font-light">
                              {spa[0]?.hourOfOpertaion[4]?.fri?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[4]?.fri?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[4]?.fri?.to}
                                </b>
                              ) : ( 
                                <b>Closed</b>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-evenly w-full md:mb-6 max-md:pb-6">
                          <div className= "text-left w-[145px] leading-8">
                            <a href="#" className="clock text-[#0b85e0]" >Suggest new hours</a>
                          </div>
                          <div className="text-left w-[124px]">
                            <span class="text-sm leading-10">
                              {/* {spa[0]?.hourOfOpertaion[6]?.sun?.isOpen ===
                              "true" ? (
                                <b>
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.from} -{" "}
                                  {spa[0]?.hourOfOpertaion[6]?.sun?.to}
                                </b>
                              ) : ( 
                                <b></b>
                              )} */}
                            </span>
                          </div>
                        </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="border-b border-[#eaeaed] flex justify-between md:-mt-44 max-md:border-b min-[1025px]:pt-11 max-[1025px]:pt-3 max-[963px]:pt-6 max-[920px]:pt-10 max-md:pt-0 md:-mb-2">
                      <div className="flex flex-row">
                        <i class="fas fa-phone-alt p-3 text-[#c8175d] text-xl"></i>
                        <div className=" mt-3 ">
                          <a
                            onClick={() => handlePhoneClick(spa[0]?.phone)}
                            className="signle-spa-link"
                          >
                            <span className=" text-[#4f4f4f] text-sm">
                              {" "}
                              {spa[0]?.phone}
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="mt-3 mr-2">
                        <a onClick={() => handlePhoneClick(spa[0]?.phone)} className="text-[#0b85e0] text-sm">Call Now</a>
                      </div>
                    </div>

                    <div className="flex md:-mt-25 max-md:border-b border-[#eaeaed] md:pt-4 max-[1025px]:mt-4 max-[963px]:-mt-2 max-md:-mt-0 max-[920px]:pt-1 max-md:py-1">
                      <div className="flex flex-row">
                        <i class="fas fa-globe p-3 text-[#c8175d] text-xl"></i>
                        <div>
                          <span className="text-sm">Visit website</span><br />
                          <a href="http://isaander.com" className="text-[#0b85e0]">http://isaander.com</a>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>

                <div className="md:px-4">
                  
                  <div className="border-b border-[#eaeaed] md:border hover:bg-[#f2f2f2] max-md:py-auto max-md:mt-1">
                    <tr>
                      <td><i class="fas fa-shield-alt p-3 text-[#c8175d] text-xl"></i></td>
                      <td className=" -mt-2 ">
                        <a>
                          <span className="text-[#4f4f4f] text-sm">
                            Own this business? Claim it now
                          </span>
                        </a>
                      </td>
                    </tr>
                  </div>
                  
                </div>

                <div className="md:px-4 pt-[16px]">
                  <div className="max-md:pb-2 md:pb-2 ml-2">
                    <span className="text-black font-bold text-base md:text-xl">Staff Attendants</span>
                  </div>
                  <div className=" border-[#eaeaed] md:border">                   

                    <div className="hidden md:block">
                      <Swiper
                        slidesPerView={9}
                        grid={{
                          rows: 1,
                        }}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Grid, Pagination]}
                        id="gallery"
                      >
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street1} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street2} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street3} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                      </Swiper>
                    </div>
                    <div className="block md:hidden">
                      <Swiper
                        slidesPerView={2}
                        grid={{
                          rows: 2,
                        }}
                        // spaceBetween={30}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Grid, Pagination]}
                        id="gallery"
                      >
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street1} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street2} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street3} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                        <SwiperSlide><div className="flex flex-col p-1"><img src={street4} className="w-full h-40 object-cover" /><span className=" ml-3 text-black text-sm font-bold">Staff Name</span><span className=" ml-3 text-black text-sm font-light">Additional Information</span></div></SwiperSlide>
                      </Swiper>                    
                    </div>
                    
                  </div>
                </div>

                <div className="md:p-4 md:pt-[8px]">
                  <div
                    className="spa-banner-bg mt-2"
                    //style={{ backgroundImage: `url(${bg3})` }}
                  >
                    <MostRecentDiscussion
                      type={"Spa"}
                      spaId={spaid}
                      name={spa[0].name}
                      locationAddress={spa[0].location}
                      phoneNumber={spa[0].phone}
                      isForum={location.state}
                    />
                    {/* <SingleSpaDiscussionReviews
                      spaId={spaid}
                      name={spa[0].name}
                      myRef={myRef}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </>
      )}
    </>
  );
}
