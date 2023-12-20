import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "@fontsource/open-sans";
import AvatarUploader from "react-avatar-uploader";
import ImageUpload from "./ImageUpload";
import SearchLocationInput from "./SearchLocationInput";

import designImag from "../../assets/left-login.png";
import eyeicon from "../../assets/eyeicon.svg";
import eyeiconclose from "../../assets/eyeicon-1.svg";

import {
  MDBInput,
  MDBCol,
  MDBInputGroup,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { NavLink, useNavigate } from "react-router-dom";
import RecentActivity from "../component/recent-activity";
import { updateProfile } from "../../axiosCalls";
import { toast } from "react-toastify";

// import { MDBInput } from "../../node_modules/mdb-react-ui-kit";
export default function Profile() {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [location, setLocation] = useState(localStorage.getItem("location"));
  const [formValue, setFormValue] = useState({
    username: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    phoneNo: localStorage.getItem("phoneNumber"),
    // location: localStorage.getItem("location"),
    password: "",
    userID:localStorage.getItem("userID"),
    image: localStorage.getItem('image'),
  });
  const [errors, setErrors] = useState({});
  const onChange = (e) => {
    setMessage("");
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const [showpassword, setfiledType] = useState(false);
  const [changeEyeIcon, seteyeIcon] = useState(true);

  const Show_password = (e) => {
    if (showpassword) {
      setfiledType(false);
      seteyeIcon(true);
    } else {
      setfiledType(true);
      seteyeIcon(false);
    }
  };

  const submitHandler = async () => {
    setMessage("");
    const { username, email, phoneNo, password } = formValue;
    let errors = {};

    if (!username) {
      errors["username"] = "User Name is required";
    }
    if (!email) {
      errors["email"] = "Email is required";
    }
    if (!phoneNo) {
      errors["phoneNo"] = "Phone No is required";
    }

    if (Object.keys(errors).length <= 0) {
      updateProfile(email, password, location, username, phoneNo, imageUrl).then(
        (res) => {
          console.log(res);
          if (res.data.success) {
            localStorage.setItem("location", res.data.data.location);
            localStorage.setItem("userName", res.data.data.userName);
            localStorage.setItem("phoneNumber", res.data.data.phoneNumber);
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem("image", res.data.data.image);

            setMessage(res.data.message);
          } else {
            setMessage(res.data.message);
          }
        }
      );
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <section className="profile-card p-[16px] pt-[40px] min-[321px]:pt-[80px] mx-[20px] sm:pt-[70px] mt-[88px] md:mt-[106px]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <ImageUpload id={formValue.userID} setImageUrl={setImageUrl} />
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-4 grid-rows-1 gap-2 sm:gap-4">
              <div className="flex items-center col-span-4 sm:col-span-1 sm:justify-end">
                User Name<span className="required-star">*</span>
              </div>
              <div className="col-span-4 sm:col-span-3">
                <MDBInput
                  className="input-filed"
                  name="username"
                  id="validationCustom01"
                  type="text"
                  onChange={onChange}
                  value={formValue.username}
                  required
                />
                {errors.username && <p className="errorText">{errors.username}</p>}
              </div>
            </div>

            <div className="grid grid-cols-4 grid-rows-1 gap-2 sm:gap-4 mt-[16px] sm:mt-[32px]">
              <div className="flex items-center col-span-4 sm:col-span-1 sm:justify-end">
                Email<span className="required-star">*</span>
              </div>
              <div className="col-span-4 sm:col-span-3">
                <MDBInput
                  className="input-filed"
                  name="email"
                  id="validationCustom01"
                  type="email"
                  onChange={onChange}
                  value={formValue.email}
                  required
                />
                {errors.email && <p className="errorText">{errors.email}</p>}
              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-3"> </div>
              <div className="col-md-2 col-6">Phone Number </div>
              <div className="col-md-6 col-9">
                <MDBInput
                  className=" input-filed"
                  name="phoneNo"
                  id="validationCustom01"
                  type="text"
                  onChange={onChange}
                  value={formValue.phoneNo}
                  required
                />
                {errors.phoneNo && <p className="errorText">{errors.phoneNo}</p>}
              </div>
            </div> */}

            <div className="grid grid-cols-4 grid-rows-1 gap-2 sm:gap-4 mt-[16px] sm:mt-[32px]">
              <div className="flex items-center col-span-4 sm:col-span-1 sm:justify-end">Location </div>
              <div className="col-span-4 sm:col-span-3">
                <SearchLocationInput currentLocation={location} setLocation={setLocation} />
              </div>
            </div>

          {/* <div className="row">
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#c8175d",

                fontWeight: 600,
              }}
            >
              {message}
            </p>
            <div className="col-md-1"></div>
            <div className="col-md-6 col-9">
              <MDBInputGroup className="mb-3 passwordgroup">
                <MDBInput
                  type="hidden"
                  name="password"
                  id="validationCustom02"
                  required
                  onChange={onChange}
                  value={formValue.password}
                >
                  {" "}
                </MDBInput>
              </MDBInputGroup>
            </div>
          </div> */}
          </div>
        </div>
        <div className="flex justify-between sm:justify-center mt-4">
          <MDBBtn className="btn btn-outline btn-create-post">Cancel</MDBBtn>
          <MDBBtn onClick={submitHandler}>Save</MDBBtn>
        </div>
      </section>

      <section className="recenet-act">{/* <RecentActivity /> */}</section>
    </>
  );
}
