import React from 'react'
import MasseuseTable from './MasseuseTable'
import { NavLink, useNavigate } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit";
export default function MasseuseAccount() {
  const navigate = useNavigate();
  const handlerRegister = () => {
    navigate("/account/masseuse/add");
  };



  return (
    <>
      <MasseuseTable />
    </>
  )
}
