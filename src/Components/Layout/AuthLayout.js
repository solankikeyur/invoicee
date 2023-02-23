import React, { useState, useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Layout/Components/Navbar";
import Sidebar from "../Layout/Components/Sidebar";
import axios from "../../AuthAxios";
import UserContext from "../../Context/UserContext";
import Loader from "./Components/Loader";

const AuthLayout = () => {
  const { token: AUTH_TOKEN, loader } = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (AUTH_TOKEN) {
      axios
        .get("/getProfile")
        .then(({ data }) => {
          setUser(data.user);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }, [AUTH_TOKEN]);

  if (!AUTH_TOKEN) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <>
      <Loader show={loader} ></Loader>
      <Sidebar></Sidebar>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <Navbar user={user}></Navbar>
        <div className="body flex-grow-1 px-3">
          <div className="container-lg">
            <Outlet></Outlet>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    </>
  );
};

export default AuthLayout;
