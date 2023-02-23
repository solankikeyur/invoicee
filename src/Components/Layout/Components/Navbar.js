/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../Context/UserContext";
import axios from "../../../AuthAxios";

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const {setLoader, setToken} = useContext(UserContext);
  const handleLogout = () => {
    setLoader(true);
    axios.post("/logout").then(() => {
      setToken(null);
      setLoader(false);
      return navigate("/login");
    }).catch((errors) => {
      setLoader(false);
      console.log(errors);
    })
    
  }

  return (
    <header className="header header-sticky mb-4">
      <div className="container-fluid">
        <button
          className="header-toggler px-md-0 me-md-3"
          type="button"
        ></button>
        <a className="header-brand d-md-none" href="#">
          <svg width={118} height={46} alt="CoreUI Logo">
            <use xlinkHref="assets/brand/coreui.svg#full" />
          </svg>
        </a>
        <ul className="header-nav ms-3">
          <li className="nav-item dropdown">
            <a
              className="nav-link py-0"
              data-coreui-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="avatar avatar-md">
                <img
                  className="avatar-img"
                  src="/img/admin.jpg"
                  alt="user@email.com"
                />
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end pt-0">
              <div className="dropdown-header bg-light py-2">
                <div className="fw-semibold">{user.name ?? ""}</div>
              </div>
              <a className="dropdown-item" href="#">
                <svg className="icon me-2">
                  <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-user" />
                </svg>{" "}
                Profile
              </a>
              <button type="button" className="dropdown-item" onClick={handleLogout}>
                <svg className="icon me-2">
                  <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-account-logout" />
                </svg>{" "}
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div className="header-divider" />
      <div className="container-fluid"></div>
    </header>
  );
};

export default Navbar;
