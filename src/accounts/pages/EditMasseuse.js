import React, { useState, useEffect, useRef } from "react";
import "../css/edit-spa.module.css";
import imagePreview from "../../assets/bg-3.png";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import ImageUploading from "react-images-uploading";
import { useLocation, useNavigate } from "react-router-dom";
import add from "../../assets/icons/add.png";
import "../css/tags.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { baseUrl } from "../../utils/isLogins";
import TimeDropdown from "../TimeDropdown";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  getCities,
  uploadImages,
  editMasseuseApi,
  getSpecficMasseuse,
} from "../../axiosCalls";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import Stack from "@mui/material/Stack";
import ImagePreview from "../ImagePreview";
import EditImagePreview from "../EditImagePreview";
import { getSpas } from "../../axiosCalls";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function EditMasseuse() {
  const url = baseUrl();
  const [masseuse, setMasseuse] = useState([]);
  const naviagte = useNavigate();
  const [state, setState] = useState();
  const [column, setColumn] = useState(0);
  const [disableTime, setdisableTime] = useState(false);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  const [oldimgs, setoldimgs] = useState([]);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const search = useLocation().search;
  const [fieldValue, setFieldValue] = useState(null);
  const [sizeMessage, setSizeMessage] = useState("");
  const [logourl, setLogourl] = useState();
  const [editImgurl, setEditImgurl] = useState("");
  const fileRef = useRef(null);
  const [allSpa, setAllSpa] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [spaParentId, setSpaParentId] = useState(null);
  const [oldSpaParentId, setOldSpaParentId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(value);
  };

  const [formValue, setFormValue] = useState({
    id: "",
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
    spaName: "",
    spaLocation: "",
    spaCity: "",
    spaPhoneNo: "",
    spaWebsite: "",
    spaComment: "",
    specialization: "",
    instagram: "",
    facebook: "",
    twitter: "",
    spaEmail: "",
  });

  let cities = [];
  const [Allcity, setAllcity] = useState([]);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getCities().then((res) => {
        setAllcity(res.data.data);
      });
    };

    const fetchMasseuse = async () => {
      const spaid = new URLSearchParams(search).get("id");
      const allSpaData = await getSpas();
      setAllSpa(allSpaData.data.data);

      await getSpecficMasseuse(spaid).then((res) => {
        const isExistMasseuseParantId =
          !res.data.data[0].spaMessauses?.length === 0
            ? null
            : res.data.data[0]?.spaMessauses[0]?.spaId;
        const masseuseParantId = res.data.data[0]?.spaMessauses[0]?.spaId;

        allSpaData.data.data?.map((singleSpa) => {
          if (isExistMasseuseParantId) {
            if (masseuseParantId === singleSpa.id) {
              setPersonName(singleSpa.name);
            }
          }
        });

        setSpaParentId(
          !res.data.data[0].spaMessauses?.length === 0
            ? null
            : res.data.data[0]?.spaMessauses[0]?.spaId
        );
        setOldSpaParentId(
          !res.data.data[0].spaMessauses?.length === 0
            ? null
            : res.data.data[0]?.spaMessauses[0]?.spaId
        );

        setLoading(res.data.data[0].spaMessauses?.length === 0 ? false : true);
        setMasseuse(res.data.data[0]);
        setImages(res.data.data[0].image);
        setoldimgs(res.data.data[0].image);
        setTags(res.data.data[0].specialization);
        setEditImgurl(res.data.data[0].logo);
        setLogourl(res.data.data[0].logo);
        setFormValue({
          id: spaid,
          spaName: res.data.data[0].name,
          monfrom: res.data.data[0].hourOfOpertaion[0]?.mon?.from,
          monto: res.data.data[0].hourOfOpertaion[0]?.mon?.to,
          monstate: res.data.data[0].hourOfOpertaion[0]?.mon?.isOpen,
          tuefrom: res.data.data[0].hourOfOpertaion[1]?.tue?.from,
          tueto: res.data.data[0].hourOfOpertaion[1]?.tue?.to,
          tuestate: res.data.data[0].hourOfOpertaion[1]?.tue?.isOpen,
          wedfrom: res.data.data[0].hourOfOpertaion[2]?.wed?.from,
          wedto: res.data.data[0].hourOfOpertaion[2]?.wed?.to,

          wedstate: res.data.data[0].hourOfOpertaion[2]?.wed?.isOpen,
          thufrom: res.data.data[0].hourOfOpertaion[3]?.thu?.from,
          thuto: res.data.data[0].hourOfOpertaion[3]?.thu?.to,
          thustate: res.data.data[0].hourOfOpertaion[3]?.thu?.isOpen,
          frifrom: res.data.data[0].hourOfOpertaion[4]?.fri?.from,
          frito: res.data.data[0].hourOfOpertaion[4]?.fri?.to,
          fristate: res.data.data[0].hourOfOpertaion[4]?.fri?.isOpen,
          satfrom: res.data.data[0].hourOfOpertaion[5]?.sat?.from,
          satto: res.data.data[0].hourOfOpertaion[5]?.sat?.to,
          satstate: res.data.data[0].hourOfOpertaion[5]?.sat?.isOpen,
          sunfrom: res.data.data[0].hourOfOpertaion[6]?.sun?.from,
          sunto: res.data.data[0].hourOfOpertaion[6]?.sun?.to,
          sunstate: res.data.data[0].hourOfOpertaion[6]?.sun?.isOpen,
          spaLocation: res.data.data[0].location,
          spaCity: res.data.data[0].city,
          spaPhoneNo: res.data.data[0].phone,
          spaWebsite: res.data.data[0].website,
          spaComment: res.data.data[0].comment,
          instagram: res.data.data[0].instagram,
          facebook: res.data.data[0].facebook,
          twitter: res.data.data[0].twitter,
          spaEmail: res.data.data[0].email,
        });
      });
    };

    fetchData();
    fetchMasseuse();
  }, []);

  const handleCancel = () => {
    naviagte("/account/masseuse");
  };

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

  const maxNumber = 10; //maximum image upload
  const onChangeImage = (imageList) => {
    setImages(imageList);
    //   console.log(imageList)
  };

  const ChangeCheck = (e, data) => {
    // console.log(e);
    console.log(data);
    if (data === "true") {
      setFormValue({ ...formValue, [e.target.name]: "Closed" });
    } else {
      setFormValue({ ...formValue, [e.target.name]: "true" });
    }
    // setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = () => {
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

    if (loading && spaParentId === null) {
      errors["massageBusiness"] = "Massage business is required";
    }
    // if (!logourl) {
    //   errors["profile"] = "Profile picture is required";
    // }

    // if (
    //   ((!formValue.monfrom || !formValue.monto) &&
    //     formValue.monstate === "true") ||
    //   ((!formValue.tuefrom || !formValue.tueto) &&
    //     formValue.tuestate === "true") ||
    //   ((!formValue.wedfrom || !formValue.wedto) &&
    //     formValue.wedstate === "true") ||
    //   ((!formValue.thufrom || !formValue.thuto) &&
    //     formValue.thustate === "true") ||
    //   ((!formValue.frifrom || !formValue.frito) &&
    //     formValue.fristate === "true") ||
    //   ((!formValue.satfrom || !formValue.satto) &&
    //     formValue.satstate === "true") ||
    //   ((!formValue.sunfrom || !formValue.sunto) &&
    //     formValue.sunstate === "true")
    // ) {
    //   errors["time"] = "All day & times is required";
    // }

    if (formValue.spaEmail) {
      const validEmail = new RegExp(
        `^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$`
      );
      if (!validEmail.test(formValue.spaEmail)) {
        errors["email"] = "Incorrect email";
      }
    }

    // if (!formValue.spaPhoneNo) {
    //   errors["spaPhoneNo"] = "Phone no is required";
    // }
    // if (!formValue.spaLocation) {
    //   errors["spaLocation"] = "Location is required";
    // }

    let locationSpa;
    if (!formValue.spaLocation) {
      locationSpa = null;
    } else {
      locationSpa = formValue.spaLocation;
    }
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
    let facebook;
    if (!formValue.facebook) {
      facebook = null;
    } else {
      facebook = formValue.facebook;
    }
    let instagram;
    if (!formValue.instagram) {
      instagram = null;
    } else {
      instagram = formValue.instagram;
    }
    let twitter;
    if (!formValue.twitter) {
      twitter = null;
    } else {
      twitter = formValue.twitter;
    }

    if (Object.keys(errors).length <= 0) {
      setCheck(true);
      const userId = localStorage.getItem("userID");
      if (images?.length) {
        let formData = new FormData(); //formdata object
        let allImages = [];
        images.map((img) => {
          formData.append("files", img.file);

          console.log(oldimgs, img);
          if (img.img) {
            allImages = [...allImages, img];
          }
        });
        uploadImages(formData)
          .then((res) => {
            res.data.data.map((img) => {
              allImages = [...allImages, img];
            });
          })
          .catch((error) => {
            console.log(error, "catch execute of editmasseuse");
          });

        setTimeout(() => {
          editMasseuseApi(
            formValue.id,
            formValue.spaName,
            allImages,
            formValue.spaPhoneNo,
            websiteSpa,
            timeTable,
            formValue.spaCity,
            userId,
            locationSpa,
            tags,
            instagram,
            facebook,
            twitter,
            commentSpa,
            formValue.spaEmail,
            logourl,
            spaParentId,
            oldSpaParentId
          )
            .then((responseSpa) => {

              if (responseSpa.data.success) {

                // toast(responseSpa.data.message, {
                //   position: "top-right",
                //   autoClose: 2000,
                //   hideProgressBar: false,
                //   closeOnClick: true,
                //   pauseOnHover: true,
                //   draggable: true,
                //   progress: undefined,
                //   theme: "colored",
                // });
                setCheck(false);
              }
            })
            .catch((err) => {
              setCheck(false);
            });
        }, 5000);
      } else {
        editMasseuseApi(
          formValue.id,
          formValue.spaName,
          images,
          formValue.spaPhoneNo,
          websiteSpa,
          timeTable,
          formValue.spaCity,
          userId,
          locationSpa,
          tags,
          instagram,
          facebook,
          twitter,
          commentSpa,
          formValue.spaEmail,
          logourl,
          spaParentId,
          oldSpaParentId
        )
          .then((responseSpa) => {

            if (responseSpa.data.success) {

              // toast(responseSpa.data.message, {
              //   position: "top-right",
              //   autoClose: 2000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   theme: "colored",
              // });
              setCheck(false);

            }
          })
          .catch((err) => {
            setCheck(false);
          });
      }
    } else {
      setErrors(errors);
    }
  };

  const handleKeypress = (e) => {
    // console.log(e); //it triggers by pressing the enter key
    // if ((e.which === 13 || e.krycode === 13) && !e.shiftKey) {
    //   onSubmitHandle();
    // }
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

  const switchStyle = {
    borderRadius: 2,
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#c8175d",
    },
    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
      backgroundColor: "#c8175d",
    },
    "&:hover .MuiSwitch-switchBase": {
      color: "#c8175d",
    },
  };

  const handleLoading = () => {
    setLoading(!loading);
    setSpaParentId(null);
    setPersonName([]);
  };

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
      <form action="">
        <div class="card card1" id="">
          <div class="card-body-to">
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <h5>
                    Staff Name<span className="required-star">*</span>
                  </h5>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    placeholder="e.g. Vivian"
                    name="spaName"
                    value={formValue.spaName}
                    required
                  />

                  {errors.spaName && (
                    <p className="errorText">{errors.spaName}</p>
                  )}
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <h5></h5>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <FormControlLabel
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      marginLeft: "-2px",
                    }}
                    control={
                      <Switch
                        checked={loading}
                        onChange={() => handleLoading()}
                        sx={switchStyle}
                        name="loading"
                      />
                    }
                    label="Is staff"
                    labelPlacement="start"
                  />
                </div>
              </div>
            </div>
            {loading && (
              <>
                <div class="container" id="customclassforcontainer">
                  <div class="row">
                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                      <h5>
                        Select Massage Business{" "}
                        <span className="required-star">*</span>
                      </h5>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                      <FormControl sx={{ width: "100%" }} size="small">
                        {/* <InputLabel id="demo-select-small">Name</InputLabel> */}
                        <Select
                          sx={{
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            "&:hover": {
                              "&& fieldset": {
                                borderColor: "#4f4f4f",
                                opacity: 0.5,
                              },
                            },

                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#4f4f4f",
                              opacity: 0.5,
                            },
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                "& .MuiMenuItem-root.Mui-selected": {
                                  backgroundColor: "#c8175d",
                                },
                                "& .MuiMenuItem-root:hover": {
                                  backgroundColor: "#c8175d",
                                },
                                "& .MuiMenuItem-root.Mui-selected:hover": {
                                  backgroundColor: "#c8175d",
                                },
                                maxHeight: 48 * 4.5 + 8,
                                width: 250,
                              },
                            },
                          }}
                          labelId="demo-select-small"
                          id="demo-select-small"
                          single
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Name" />}
                        >
                          {allSpa.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.name}
                              style={getStyles(name, personName, theme)}
                              onClick={() => setSpaParentId(name.id)}
                            >
                              {name.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {errors.massageBusiness && (
                        <p className="errorText">{errors.massageBusiness}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <h5>Specialization</h5>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <div
                    style={{
                      display: "flex",
                      // overflow: "scroll",
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
                          onClick={() => deleteTag(index)}
                          type="button"
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
                      type="text"
                      class="form-control"
                      onKeyPress={handleKeypress}
                      name="specialization"
                      required
                    />
                  </div>

                  {/* {errors.specialization && (
                    <p className="errorText">{errors.specialization}</p>
                  )} */}
                </div>
              </div>

              <div class="container" id="customcontainer">
                <div class="row">
                  <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                    <h5>Days & Times</h5>
                  </div>

                  <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12 timetable">
                    <table class="table table-borderless" id="customtable1">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td class="day">Mon</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.monfrom}
                                state={formValue.monstate}
                                name="monfrom"
                                ChangeTime={onChange}
                              />
                            </div>
                          </td>

                          <td class="classfortotext">To</td>
                          <td>
                            <div class="content">
                              <TimeDropdown
                                value={formValue.monto}
                                state={formValue.monstate}
                                name="monto"
                                ChangeTime={onChange}
                              />
                            </div>
                          </td>

                          <td>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                onChange={onChange}
                                value={
                                  formValue.monstate === "true"
                                    ? "Closed"
                                    : "true"
                                }
                                name="monstate"
                                type="checkbox"
                                id="1"
                                checked={
                                  formValue.monstate === "true" ? "" : "checked"
                                }
                              />
                              <label class="form-check-label" for="1">
                                Closed
                              </label>
                            </div>
                          </td>
                        </tr>
                        <tr>
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
                        </tr>
                      </tbody>
                    </table>
                    {errors.time && <p className="errorText">{errors.time}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Location Address</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaLocation"
                    id="inputlocation"
                    value={formValue.spaLocation}
                  />
                  {errors.spaLocation && (
                    <p className="errorText">{errors.spaLocation}</p>
                  )}
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Phone Number</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    required
                    class="form-control"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
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
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>
                      Masseuse Profile Picture{" "}
                      <span className="required-star"></span>
                    </h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
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
                  {errors.profile && (
                    <p className="errorText">{errors.profile}</p>
                  )}
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="email">
                    <h5>Business Email</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    required
                    class="form-control"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaEmail"
                    id="inputphone"
                    // placeholder="e.g. bslidesbot@gmail.com"
                    value={formValue.spaEmail}
                  />
                  {errors.email && <p className="errorText">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5 style={{ paddingTop: "20px" }}>Images</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
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
                        className="upload__image-wrapper row 
                      "
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
                                {/* {console.log("testimage",image)} */}
                                {/* { imageURL=`${url}/files/${image.img}`} */}
                                <img
                                  src={
                                    image.img
                                      ? `${url}/files/${image.img}`
                                      : image["data_url"]
                                  }
                                  alt=""
                                  id={index}
                                  width="100px"
                                  height="100px"
                                  style={{
                                    background: `url(${imagePreview})`,
                                    // padding: "5px",
                                    maxWidth: "none",
                                  }}
                                />
                              </button>
                              <div
                                style={{
                                  marginTop: "-20px",
                                  marginLeft: "-73px",
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
                          <img src={add} width="40" height="40" alt="add img" />
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
                  {errors.images && (
                    <p className="errorText">{errors.images}</p>
                  )}
                  <div class="ml-2 col-sm-6">
                    <div id="msg"></div>

                    {/* <form method="post" id="image-form">
                         
                                <input type="file" name="img[]" class="file" accept="image/*" />                      
                            </form> */}
                  </div>
                  <div class="ml-2 col-sm-6">
                    {/* <img src={imagePreview} id="preview" class="img-thumbnail" width="100px" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>City</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    required
                    class="form-control"
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaCity"
                    id="inputlocation"
                    placeholder="e.g. Toronto"
                    value={formValue.spaCity}
                  />
                </div>
              </div>
            </div>

            {/* <div class="container" id="customclassforcontainer">
                                <div class="row">
                                    <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                                        <label for="Location">
                                            <h5>Services</h5>
                                        </label>
                                    </div>
                                    <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                                    <InputTags  values={state}  onTags={(value) => setState(value.values)} />
                                        
                                    </div>

                                </div>

                            </div> */}

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Website</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="spaWebsite"
                    value={formValue.spaWebsite}
                  />
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Instagram</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="instagram"
                    value={formValue.instagram}
                  />
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Facebook</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="facebook"
                    value={formValue.facebook}
                  />
                </div>
              </div>
            </div>
            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Twitter</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    onChange={onChange}
                    onKeyPress={handleKeypress}
                    name="twitter"
                    value={formValue.twitter}
                  />
                </div>
              </div>
            </div>

            <div class="container" id="customclassforcontainer">
              <div class="row">
                <div class="col-lg-3 col-sm-12 col-xs-12 col-md-12">
                  <label for="Location">
                    <h5>Additional Information</h5>
                  </label>
                </div>
                <div class="col-lg-8 col-sm-12 col-xs-12 col-md-12">
                  <textarea
                    class="form-control"
                    placeholder="Introduce your business, add any information you'd like for people to know about business"
                    onChange={onChange}
                    name="spaComment"
                    onKeyPress={handleKeypress}
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    data-role="tagsinput"
                    value={formValue.spaComment}
                  ></textarea>
                </div>
              </div>

              <button
                class="button22"
                type="button"
                onClick={onSubmitHandle}
                style={{ float: "right", marginTop: "20px" }}
              >
                Save
              </button>
              <button
                class="button111"
                style={{ float: "right", marginTop: "20px" }}
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                class="button111"
                style={{
                  float: "right",
                  marginTop: "20px",
                  marginRight: "14px",
                }}
                onClick={() => {
                  naviagte(`/single-masseuse?id=${formValue.id}`);
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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
