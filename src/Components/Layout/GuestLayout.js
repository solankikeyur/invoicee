import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Loader from "../Layout/Components/Loader";

const GuestLayout = () => {
  const { token: AUTH_TOKEN, loader } = useContext(UserContext);
  
  if (AUTH_TOKEN) {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return (
    <>
      <Loader show={loader}></Loader>
      <Outlet></Outlet>
    </>
  );
};

export default GuestLayout;
