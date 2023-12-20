import React, { useState, useEffect, useRef } from "react";
import "../css/edit-spa.module.css";
import imagePreview from "../../assets/bg-3.png";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import ImageUploading from "react-images-uploading";
import add from "../../assets/icons/add.png";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  editSpa,
  getCities,
  getsingalSpa,
  putAvatar,
  uploadImages,
} from "../../axiosCalls";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/isLogins";
import { BallTriangle } from "react-loader-spinner";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import ImagePreview from "../ImagePreview";
import EditImagePreview from "../EditImagePreview";
import AutoLocation from "./AutoLocation";
import TimeDropdown from "../TimeDropdown";

export default function EditSpa() {
  const naviagte = useNavigate();
  const [selected, setSelected] = useState([]);
  const [tags11, setTags11] = useState([]);
  const [tag, setTag] = useState();
  const [column, setColumn] = useState();
  const [images, setImages] = useState([]);
  const [spa, setspa] = useState([]);
  const [Allcity, setAllcity] = useState([]);
  const search = useLocation().search;
  const [check, setCheck] = useState(false);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [oldimgs, setoldimgs] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [obj3, setObjState] = useState([]);
  const [fieldValue, setFieldValue] = useState(null);
  const [sizeMessage, setSizeMessage] = useState("");
  const [isExist, setIsExist] = useState(true);
  const [logourl, setLogourl] = useState();
  const [editImgurl, setEditImgurl] = useState("");
  const [location, setLocation] = useState("");

  const selectedTags = (tags) => {
    console.log(tags);
  };

  const fileRef = useRef(null);
  const url = baseUrl();
  const [formValue, setFormValue] = useState({
    monfrom: "",
    monto: "",
    monstate: "true",
    tuefrom: "",
    tueto: "",
    tuestate: "true",
    wedfrom: "",
    wedto: "",
    wedstate: "true",
    thufrom: "",
    thuto: "",
    thustate: "true",
    frifrom: "",
    frito: "",
    fristate: "true",
    satfrom: "",
    satto: "",
    satstate: "true",
    sunfrom: "",
    sunto: "",
    sunstate: "true",
    images: [],
    spaName: "",
    spaLocation: "",
    spaServices: "",
    spaCity: null,
    spaPhoneNo: null,
    spaWebsite: "",
    spaComment: "",
    id: "",
    spaEmail: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      await getCities().then((res) => {
        console.log(res.data.data);
        let k = 0;

        setAllcity(res.data.data);
      });
    };

    const fetchSpa = async () => {
      const spaid = new URLSearchParams(search).get("id");

      await getsingalSpa(spaid).then((res) => {
        console.log(res);
        setTags(res.data.data[0].services);
        setImages(res.data.data[0].image);
        setoldimgs(res.data.data[0].image);
        setEditImgurl(res.data.data[0].logo);
        setLogourl(res.data.data[0].logo);
        setLocation(res.data.data[0].location);
        setFormValue({
          id: spaid,
          spaName: res.data.data[0].name,
          spaLocation: res.data.data[0].location,
          spaServices: res.data.data[0].services,
          spaPhoneNo: res.data.data[0].phone,
          spaWebsite: res.data.data[0].website,
          monstate: res.data.data[0].hourOfOpertaion[0].mon.isOpen,
          monfrom: res.data.data[0].hourOfOpertaion[0].mon.from,
          monto: res.data.data[0].hourOfOpertaion[0].mon.to,
          tuestate: res.data.data[0].hourOfOpertaion[1].tue.isOpen,
          tuefrom: res.data.data[0].hourOfOpertaion[1].tue.from,
          tueto: res.data.data[0].hourOfOpertaion[1].tue.to,
          wedstate: res.data.data[0].hourOfOpertaion[2].wed.isOpen,
          wedfrom: res.data.data[0].hourOfOpertaion[2].wed.from,
          wedto: res.data.data[0].hourOfOpertaion[2].wed.to,
          thustate: res.data.data[0].hourOfOpertaion[3].thu.isOpen,
          thufrom: res.data.data[0].hourOfOpertaion[3].thu.from,
          thuto: res.data.data[0].hourOfOpertaion[3].thu.to,
          fristate: res.data.data[0].hourOfOpertaion[4].fri.isOpen,
          frifrom: res.data.data[0].hourOfOpertaion[4].fri.from,
          frito: res.data.data[0].hourOfOpertaion[4].fri.to,
          satstate: res.data.data[0].hourOfOpertaion[5].sat.isOpen,
          satfrom: res.data.data[0].hourOfOpertaion[5].sat.from,
          satto: res.data.data[0].hourOfOpertaion[5].sat.to,
          sunstate: res.data.data[0].hourOfOpertaion[6].sun.isOpen,
          sunfrom: res.data.data[0].hourOfOpertaion[6].sun.from,
          sunto: res.data.data[0].hourOfOpertaion[6].sun.to,
          spaCity: res.data.data[0].city,
          images: res.data.data[0].image,
          spaComment: res.data.data[0].comment,
          spaEmail: res.data.data[0].email,
        });
      });
    };

    fetchData();
    fetchSpa().catch(console.error);
  }, []);

  console.log(tags);

  const onChange = (e) => {
    if (e.target.name === "monstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        monfrom: "",
        monto: "",
      });
    } else if (e.target.name === "tuestate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        tuefrom: "",
        tueto: "",
      });
    } else if (e.target.name === "wedstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        wedfrom: "",
        wedto: "",
      });
    } else if (e.target.name === "thustate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        thufrom: "",
        thuto: "",
      });
    } else if (e.target.name === "fristate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        frifrom: "",
        frito: "",
      });
    } else if (e.target.name === "satstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        satfrom: "",
        satto: "",
      });
    } else if (e.target.name === "sunstate") {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
        sunfrom: "",
        sunto: "",
      });
    } else {
      console.log("default else get excuted");

      if (e.target.name) {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
      } else {
        setFormValue({
          ...formValue,
          [e.target.getAttribute("name")]: e.target.textContent,
        });
      }
    }
  };

  console.log(formValue);

  const ChangeCheck = (e, data) => {
    if (data === "true") {
      setFormValue({ ...formValue, [e.target.name]: "Closed" });
    } else {
      setFormValue({ ...formValue, [e.target.name]: "true" });
    }
  };

  // console.log(formValue);

  spa.map((getspa) => {
    // formValue.spaName = getspa.name
  });

  const maxNumber = 10;

  const onChangeImage = (imageList) => {
    setImages(imageList);
    console.log("onchange images", imageList);
  };

  const [errors, setErrors] = useState({});

  const onSubmitHandle = async() => {
    let errors = {};

    const timeTable = [
      {
        mon: {
          isOpen: formValue.monstate,
          from: formValue.monfrom,
          to: formValue.monto,
        },
      },
      {
        tue: {
          isOpen: formValue.tuestate,
          from: formValue.tuefrom,
          to: formValue.tueto,
        },
      },
      {
        wed: {
          isOpen: formValue.wedstate,
          from: formValue.wedfrom,
          to: formValue.wedto,
        },
      },
      {
        thu: {
          isOpen: formValue.thustate,
          from: formValue.thufrom,
          to: formValue.thuto,
        },
      },
      {
        fri: {
          isOpen: formValue.fristate,
          from: formValue.frifrom,
          to: formValue.frito,
        },
      },
      {
        sat: {
          isOpen: formValue.satstate,
          from: formValue.satfrom,
          to: formValue.satto,
        },
      },
      {
        sun: {
          isOpen: formValue.sunstate,
          from: formValue.sunfrom,
          to: formValue.sunto,
        },
      },
    ];

    if (!formValue.spaName) {
      errors["spaName"] = "Name is required";
    }

    if (
      ((!formValue.monfrom || !formValue.monto) &&
        formValue.monstate === "true") ||
      ((!formValue.tuefrom || !formValue.tueto) &&
        formValue.tuestate === "true") ||
      ((!formValue.wedfrom || !formValue.wedto) &&
        formValue.wedstate === "true") ||
      ((!formValue.thufrom || !formValue.thuto) &&
        formValue.thustate === "true") ||
      ((!formValue.frifrom || !formValue.frito) &&
        formValue.fristate === "true") ||
      ((!formValue.satfrom || !formValue.satto) &&
        formValue.satstate === "true") ||
      ((!formValue.sunfrom || !formValue.sunto) &&
        formValue.sunstate === "true")
    ) {
      errors["time"] = "All day & times is required";
    }

    if (!formValue.spaPhoneNo) {
      errors["spaPhoneNo"] = "Phone no is required";
    }

    if (location.length == 0) {
      errors["spaLocation"] = "Location is required";
    }

    if (formValue.spaEmail) {
      const validEmail = new RegExp(
        `^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`
      );
      if (!validEmail.test(formValue.spaEmail)) {
        errors["email"] = "Incorrect email";
      }
    }

    // let locationSpa;
    // if (!formValue.spaLocation) {
    //   locationSpa = null;
    // } else {
    //   locationSpa = formValue.spaLocation;
    // }
    let websiteSpa;
    if (!formValue.spaWebsite) {
      websiteSpa = null;
    } else {
      websiteSpa = formValue.spaWebsite;
    }
    let commentSpa;
    if (!formValue.spaComment) {
      commentSpa = null;
    } else {
      commentSpa = formValue.spaComment;
    }
    if (Object.keys(errors).length <= 0) {
      setCheck(true);

      if (images.length) {
        let uploadedFiles = [];
        const image_map = () => {
          setCheck(true);
          images.map((img) => {
            if(img.img) {
              uploadedFiles.push(img);
            } else {
              let key = "spa/" + Date.now().toString() + "_" + img.file?.name;
              putAvatar(img.file, key);
              uploadedFiles.push({
                img: "https://bsbbnet.s3.ca-central-1.amazonaws.com/" + key,
              });
            }
          });
        };
        await image_map();
        console.log("aaaaaaaaaaaaa", uploadedFiles);
        await editSpa(
          formValue.id,
          formValue.spaName,
          uploadedFiles,
          formValue.spaPhoneNo,
          websiteSpa,
          timeTable,
          formValue.spaCity,
          location,
          tags,
          commentSpa,
          formValue.spaEmail,
          logourl
        ).then((responseSpa) => {
          console.log(responseSpa);
          if (responseSpa.data.success) {
            toast(responseSpa.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setCheck(false);
            naviagte("/account/spa");
          }
        });
      } else {
        editSpa(
          formValue.id,
          formValue.spaName,
          images,
          formValue.spaPhoneNo,
          websiteSpa,
          timeTable,
          formValue.spaCity,
          location,
          tags,
          commentSpa,
          formValue.spaEmail,
          logourl
        ).then((responseSpa) => {
          console.log(responseSpa);
          if (responseSpa.data.success) {
            toast(responseSpa.data.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setCheck(false);
            naviagte("/account/spa");
          }
        });
      }
    } else {
      setErrors(errors);
    }
  };
  let mystyle;
  if (check) {
    mystyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: "111111",
    };
  } else {
    mystyle = {
      display: "block",
    };
  }

  const onChangeTags = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === "," || key === "Enter") &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    // if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
    //   const tagsCopy = [...tags];
    //   const poppedTag = tagsCopy.pop();
    //   e.preventDefault();
    //   setTags(tagsCopy);
    //   setInput(poppedTag);
    // }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };
  tags.forEach((element, index) => {
    const obj = { title: element };
    obj3.push(obj);
  });

  return (
    <>
      {check ? (
        <div style={mystyle}>
          <div className="ball-triangle-loading">
            <BallTriangle
              height={89}
              width={80}
              radius={5}
              color="#C8175D "
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      <form>
        <div className="mx-auto max-w-[900px] mt-[78px] md:mt-[98px]">
          <div className="flex flex-col m-[12px] p-[0px] py-[20px] md:p-[24px] space-y-4 border shadow-sm">
            <div class="row flex items-center">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                <span className="font-bold w-[50px]">
                  Business Name<span className="required-star">*</span>
                </span>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <input
                  type="text"
                  class="form-control"
                  onChange={onChange}
                  name="spaName"
                  value={formValue.spaName}
                  placeholder="e.g. Oriental Wellness Spa"
                  required
                />
                {errors.spaName && (
                  <p className="errorText">{errors.spaName}</p>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <span className="font-bold w-[50px]">
                  Days & Times<span className="required-star">*</span>
                </span>
              </div>

              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                {/* <table class="table table-borderless" id="customtable1">
                  <tbody> */}
                    <div className="border rounded-[5px] py-4 space-y-4">
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="monstate"
                            type="checkbox"
                            value={
                              formValue.monstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="1"
                            checked={
                              formValue.monstate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Mon</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.monfrom}
                              state={formValue.monstate}
                              name="monfrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.monto}
                              state={formValue.monstate}
                              name="monto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="monstate"
                              type="checkbox"
                              value={
                                formValue.monstate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="1"
                              checked={
                                formValue.monstate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="1">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="tuestate"
                            type="checkbox"
                            value={
                              formValue.tuestate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="2"
                            checked={
                              formValue.tuestate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Tue</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.tuefrom}
                              state={formValue.tuestate}
                              name="tuefrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.tueto}
                              state={formValue.tuestate}
                              name="tueto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="tuestate"
                              type="checkbox"
                              value={
                                formValue.tuestate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="2"
                              checked={
                                formValue.tuestate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="2">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="wedstate"
                            type="checkbox"
                            value={
                              formValue.wedstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="3"
                            checked={
                              formValue.wedstate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Wed</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.wedfrom}
                              state={formValue.wedstate}
                              name="wedfrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.wedto}
                              state={formValue.wedstate}
                              name="wedto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="wedstate"
                              type="checkbox"
                              value={
                                formValue.wedstate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="3"
                              checked={
                                formValue.wedstate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="3">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="thustate"
                            type="checkbox"
                            value={
                              formValue.thustate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="4"
                            checked={
                              formValue.thustate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Thu</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.thufrom}
                              state={formValue.thustate}
                              name="thufrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.thuto}
                              state={formValue.thustate}
                              name="thuto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="thustate"
                              type="checkbox"
                              value={
                                formValue.thustate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="4"
                              checked={
                                formValue.thustate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="4">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="fristate"
                            type="checkbox"
                            value={
                              formValue.fristate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="5"
                            checked={
                              formValue.fristate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Fri</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.frifrom}
                              state={formValue.fristate}
                              name="frifrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.frito}
                              state={formValue.fristate}
                              name="frito"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="fristate"
                              type="checkbox"
                              value={
                                formValue.fristate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="5"
                              checked={
                                formValue.fristate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="5">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="satstate"
                            type="checkbox"
                            value={
                              formValue.satstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="6"
                            checked={
                              formValue.satstate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Sat</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.satfrom}
                              state={formValue.satstate}
                              name="satfrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.satto}
                              state={formValue.satstate}
                              name="satto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="satstate"
                              type="checkbox"
                              value={
                                formValue.satstate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="6"
                              checked={
                                formValue.satstate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="6">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                      <div  className="grid grid-cols-3 sm:grid-cols-5 items-center">
                        <div className="flex w-full justify-evenly mx-auto">
                          <input
                            class="form-check-input sm:hidden"
                            onChange={onChange}
                            name="sunstate"
                            type="checkbox"
                            value={
                              formValue.sunstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            id="7"
                            checked={
                              formValue.sunstate === "true" ? "" : "checked"
                            }
                          />
                          <span className="font-bold w-[50px]">Sun</span>
                        </div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.sunfrom}
                              state={formValue.sunstate}
                              name="sunfrom"
                              ChangeTime={onChange}
                              className="w-[80px]"
                            />
                          </div>
                        </div>

                        <div className="hidden classfortotext mx-auto sm:block">To</div>
                        <div className="mx-auto">
                          <div class="content">
                            <TimeDropdown
                              value={formValue.sunto}
                              state={formValue.sunstate}
                              name="sunto"
                              ChangeTime={onChange}
                            />
                          </div>
                        </div>

                        <div className="mx-auto hidden sm:block">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              onChange={onChange}
                              name="sunstate"
                              type="checkbox"
                              value={
                                formValue.sunstate === "true"
                                  ? "Closed"
                                  : "true"
                              }
                              id="7"
                              checked={
                                formValue.sunstate === "true" ? "" : "checked"
                              }
                            />
                            <label className="text-[13px] text-[#4f4f4f] flex items-center" for="7">
                              Closed
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <tr>
                      <td class="day">Tue</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.tuefrom}
                            state={formValue.tuestate}
                            name="tuefrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.tueto}
                            state={formValue.tuestate}
                            name="tueto"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={onChange}
                            value={
                              formValue.tuestate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="tuestate"
                            id="2"
                            checked={
                              formValue.tuestate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label " for="2">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="day">Wed</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.wedfrom}
                            state={formValue.wedstate}
                            name="wedfrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.wedto}
                            state={formValue.wedstate}
                            name="wedto"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            onChange={onChange}
                            value={
                              formValue.wedstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="wedstate"
                            id="3"
                            checked={
                              formValue.wedstate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label" for="3">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="day">Thu</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.thufrom}
                            state={formValue.thustate}
                            name="thufrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.thuto}
                            state={formValue.thustate}
                            name="thuto"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="4"
                            onChange={onChange}
                            value={
                              formValue.thustate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="thustate"
                            checked={
                              formValue.thustate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label" for="4">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="day">Fri</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.frifrom}
                            state={formValue.fristate}
                            name="frifrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.frito}
                            state={formValue.fristate}
                            name="frito"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="5"
                            onChange={onChange}
                            value={
                              formValue.fristate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="fristate"
                            checked={
                              formValue.fristate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label" for="5">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="day">Sat</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.satfrom}
                            state={formValue.satstate}
                            name="satfrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.satto}
                            state={formValue.satstate}
                            name="satto"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="6"
                            onChange={onChange}
                            value={
                              formValue.satstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="satstate"
                            checked={
                              formValue.satstate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label " for="6">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="day">Sun</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.sunfrom}
                            state={formValue.sunstate}
                            name="sunfrom"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td class="classfortotext">To</td>
                      <td>
                        <div class="content">
                          <TimeDropdown
                            value={formValue.sunto}
                            state={formValue.sunstate}
                            name="sunto"
                            ChangeTime={onChange}
                          />
                        </div>
                      </td>

                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="7"
                            onChange={onChange}
                            value={
                              formValue.sunstate === "true"
                                ? "Closed"
                                : "true"
                            }
                            name="sunstate"
                            checked={
                              formValue.sunstate === "true" ? "" : "checked"
                            }
                          />
                          <label class="form-check-label " for="7">
                            Closed
                          </label>
                        </div>
                      </td>
                    </tr> */}
                  {/* </tbody>
                </table> */}
                {/* {errors.time && <p className="errorText">{errors.time}</p>} */}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">
                    Location Address<span className="required-star">*</span>
                  </span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <AutoLocation currentLocation={location} setLocation={setLocation} />
                {/* <input
                  type="text"
                  class="form-control"
                  onChange={onChange}
                  name="spaLocation"
                  id="inputlocation"
                  value={formValue.spaLocation}
                /> */}
                {errors.spaLocation && (
                  <p className="errorText">{errors.spaLocation}</p>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">
                    Phone Number<span className="required-star">*</span>
                  </span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <input
                  type="text"
                  required
                  class="form-control"
                  onChange={onChange}
                  name="spaPhoneNo"
                  id="inputphone"
                  placeholder="e.g. 647-555-8888"
                  value={formValue.spaPhoneNo}
                />
                {errors.spaPhoneNo && (
                  <p className="errorText">{errors.spaPhoneNo}</p>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Business Profile Picture</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <Stack
                  direction="row"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItem: "center",
                  }}
                >
                  <input
                    type="file"
                    hidden
                    ref={fileRef}
                    name="file"
                    onChange={(event) => {
                      setFieldValue(event.target.files[0]);
                      setEditImgurl("");
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {editImgurl && (
                      <EditImagePreview editImgurl={editImgurl} />
                    )}

                    {fieldValue && (
                      <ImagePreview
                        file={fieldValue}
                        sizeMessage={sizeMessage}
                        setSizeMessage={setSizeMessage}
                        fieldValue={fieldValue}
                        setLogourl={setLogourl}
                      />
                    )}
                    <button
                      onClick={() => {
                        fileRef.current.click();
                      }}
                      style={{
                        width: "113px",
                        border: "none",
                        fontStyle: "normal",
                        fontFamily: "Open Sans",
                        lineHeight: "26px",
                        borderRadius: "17px",
                        height: "39px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      type="button"
                    >
                      Upload
                    </button>
                  </div>
                </Stack>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Business Email</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <input
                  type="email"
                  required
                  class="form-control"
                  onChange={onChange}
                  name="spaEmail"
                  id="inputphone"
                  // placeholder="e.g. bslidesbot@gmail.com"
                  value={formValue.spaEmail}
                />
                {errors.email && <p className="errorText">{errors.email}</p>}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Images</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <ImageUploading
                  multiple
                  value={images}
                  maxFileSize={5 * 1024 * 1024}
                  onChange={onChangeImage}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    <div
                      className="upload__image-wrapper row"
                      // row-cols-6
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* {console.log(column)} */}

                      {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                      {imageList.map((image, index) => (
                        <div key={index} className="" alt={setColumn(index)}>
                          {/* col */}
                          <div>
                            <button
                              type="button"
                              // onClick={() => onImageUpdate(index)}
                              style={{
                                background: "none",
                                color: "inherit",
                                border: "none",
                                padding: 0,
                                font: "inherit",
                                cursor: "pointer",
                                outline: "inherit",
                              }}
                            >
                              {console.log("IIIIIImage:::",image)}
                              <img
                                src={
                                  image.img
                                    ? `${image.img}`
                                    : image["data_url"]
                                }
                                alt=""
                                id={index}
                                width="100px"
                                height="100px"
                                style={{
                                  background: `url(${imagePreview})`,
                                  minWidth:"100px",
                                  minHeight:"100px"
                                }}
                              />
                            </button>
                            <div
                              style={{
                                marginTop: "-33px",
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  background: "none",
                                  color: "inherit",
                                  border: "none",
                                  padding: 0,
                                  font: "inherit",
                                  cursor: "pointer",
                                  outline: "inherit",
                                }}
                                onClick={() => onImageRemove(index)}
                              >
                                <CancelIcon style={{ color: "#C8175D" }} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        style={
                          (isDragging ? { color: "red" } : undefined,
                          {
                            height: "100px",
                            width: "100px",
                            backgroundColor: "white",
                            border: "1px solid #EBEBEB",
                            borderRadius: "5px",
                            marginLeft:
                              images?.length > 0 && images?.length != 10
                                ? "13px"
                                : "auto",
                            // marginLeft: "auto",
                            marginRight:
                              images?.length > 0 && images?.length != 10
                                ? ""
                                : "auto",
                          })
                        }
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <img src={add} width="40" height="40" alt="add img" className="mx-auto" />
                      </button>
                      {errors?.maxNumber && (
                        <span style={{ color: "#c01c5b", marginTop: "13px" }}>
                          Number of selected images exceed maxNumber
                        </span>
                      )}
                      {errors?.maxFileSize && (
                        <span style={{ color: "#c01c5b", marginTop: "13px" }}>
                          Selected file size exceed maxFileSize
                        </span>
                      )}
                    </div>
                  )}
                </ImageUploading>

                <div class="ml-2 col-sm-6">
                  <div id="msg"></div>

                  {/* <form method="post" id="image-form">
                        
                              <input type="file" name="img[]" class="file" accept="image/*" />                      
                          </form> */}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">City</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <input
                  type="text"
                  required
                  class="form-control"
                  onChange={onChange}
                  name="spaCity"
                  id="inputlocation"
                  placeholder="e.g. Toronto"
                  value={formValue.spaCity}
                />

                {errors.spaCity && (
                  <p className="errorText">{errors.spaCity}</p>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Services</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <div
                  style={{
                    display: "flex",
                    overflow: "scroll",
                    width: "100%",
                    maxWidth: "100%",
                    paddingLeft: "14px",
                    border: "2px #bdbdbd solid",
                    borderRadius: "5px",
                    color: "black",
                    flexWrap: "wrap",
                  }}
                  className="tagContainer"
                >
                  {tags.map((tag, index) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "7px 0",
                        marginRight: "10px",
                        padding: "0 10px",
                        paddingRight: "5px",
                        border: "1px solid #c8175d",
                        borderRadius: "18px",
                        backgroundColor: "unset",
                        whiteSpace: "nowrap",
                        color: "#4f4f4f",
                        fontWeight: 400,
                        fontSize: "15px",
                        height: "32px",
                        lineHeight: "26px",
                        fontFamily: "Open Sans",
                      }}
                    >
                      {tag}
                      <button
                        style={{
                          display: "flex",

                          border: "none",

                          borderRadius: "50%",
                          // backgroundColor: "unset",
                          cursor: "pointer",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginLeft: "4px",
                          backgroundColor: "rgb(200, 23, 93)",
                          height: "19px",
                          width: "19px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        type="button"
                        onClick={() => deleteTag(index)}
                      >
                        x
                      </button>
                    </div>
                  ))}
                  <input
                    style={{
                      width: "100%",
                      minWidth: "50%",
                      border: "none",
                      borderRadius: "5px",
                      height: "37px",
                    }}
                    value={input}
                    placeholder="e.g. Soft Massage"
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onChange={onChangeTags}
                  // onFocus={handleFocus}
                  // onblur={handleFocusOut}
                  />
                </div>

                {errors.service && (
                  <p className="errorText">{errors.service}</p>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Website</span>
                </label>
              </div>
              <div class="col-lg-9 col-sm-12 col-xs-12 col-md-12">
                <input
                  type="text"
                  class="form-control "
                  id="inputwebsite"
                  onChange={onChange}
                  name="spaWebsite"
                  aria-describedby="basic-addon3"
                  value={formValue.spaWebsite}
                />
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12 text-left">
                <label for="Location">
                  <span className="font-bold w-[50px]">Additional Information</span>
                </label>
              </div>
              <div
                class="col-lg-9 col-sm-12 col-xs-12 col-md-12 textarea-parant"
              >
                <textarea
                  class="form-control account-input"
                  placeholder="Introduce your business, add any information you'd like for people to know about business"
                  onChange={onChange}
                  name="spaComment"
                  value={formValue.spaComment}
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  data-role="tagsinput"
                >
                  {" "}
                </textarea>
              </div>
            </div>
            <div>
              <button
                class="button22 float-right max-[768px]:mr-[12px] text-[13px] md:text-[15px]"
                type="button"
                onClick={onSubmitHandle}
              >
                Save
              </button>
              <button
                class="button111 float-right mr-[5px] text-[13px] md:text-[15px]"
                onClick={() => {
                  naviagte("/account/spa");
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                class="button111 float-right mx-[5px] text-[13px] md:text-[15px]"
                onClick={() => {
                  naviagte(`/single-spa?id=${formValue.id}`)
                }}
                type="button"
              >
                View Published Page
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
