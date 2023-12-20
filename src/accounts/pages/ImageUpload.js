import React, { useState, useRef, useEffect } from "react";
import {
    MDBBtn,
  } from "mdb-react-ui-kit";
import { putAvatar } from "../../axiosCalls";

const ImageUpload = (props) => {
  const [image, setImage] = useState(localStorage.getItem('image'));
  const inputFile = useRef(null);

  const handleFileUpload = async(e) => {
    const file = e.target.files[0] 
    const key = "avatar/"+ props.id + '_' + (Date.now()).toString() + '_' +  file.name
    await putAvatar(file, key)
    setImage("https://bsbbnet.s3.ca-central-1.amazonaws.com/" + key)
    props.setImageUrl("https://bsbbnet.s3.ca-central-1.amazonaws.com/" + key)
  };

  useEffect(() => {
    console.log(localStorage.getItem('image'));
     if(localStorage.getItem('image') == null || localStorage.getItem('image').length == 0) {
      setImage("https://bsbbnet.s3.ca-central-1.amazonaws.com/avatar/21_1677649434701_illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg");
     }
	}, [props]);
  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div className="flex flex-col">
      <div className="mx-auto">
        <img
          src={image}
          style={{width:"200px", maxHeight:"200px", border:"1px solid #e2e2e2", objectFit:"cover", marginBottom:"10px"}}
          className='rounded-square'
          alt='...'
          with
        />
      </div>
      <div className="mx-auto">
        <input
          style={{ display: "none" }}
          ref={inputFile}
          onChange={handleFileUpload}
          type="file"
        />
        <MDBBtn onClick={onButtonClick} className="btn btn-outline btn-create-post mb-[16px] md:mb-[0px]">Upload</MDBBtn>
      </div>
    </div>
  );
};

export default ImageUpload;
