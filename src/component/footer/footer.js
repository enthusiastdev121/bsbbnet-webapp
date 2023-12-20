import React from "react";

import "../../css/footer.css";
import flogo from "../../assets/logo.png";

export default function Footer() {
  
  return (
  <div className="bg-[#c8175d]  w-full">
    <div className="max-w-[1600px] p-4 grid grid-cols-1 xs:grid-cols-2 h-48 max-md:h-40 xs:h-40  mx-auto">
      <div className=" my-auto">
        <img src={flogo} href="/" className="w-[96px] max-[480px]:mx-auto" />
      </div>

      <div className="flex ml-auto max-[480px]:mx-auto ">
        <ul className=" text-xl md:space-y-1 my-auto ">
          <li className="max-[480px]:mr-5">
            <a
              href="/termsAndConditions"
              className="text-light"
              target="_blank"
            >
              Terms and Conditions
            </a>
          </li>
          <li className="max-[480px]:ml-6 max-[480px]:-mt-2">
            <a
              href="/privcyAndPolicy"

              className="text-light"
              target="_blank"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}
