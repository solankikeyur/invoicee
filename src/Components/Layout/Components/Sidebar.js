import React from "react";
import { NavLink } from "react-router-dom";
import {FaUserAstronaut} from "react-icons/fa";
import {MdProductionQuantityLimits} from "react-icons/md"
import {AiFillDashboard} from "react-icons/ai";
import {FaFileInvoiceDollar} from "react-icons/fa";

const Sidebar = () => {


  return (
    <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
      <div className="sidebar-brand d-none d-md-flex">
        <svg
          className="sidebar-brand-full"
          width={118}
          height={46}
          alt="CoreUI Logo"
        >
          <use xlinkHref="assets/brand/coreui.svg#full" />
        </svg>
        <svg
          className="sidebar-brand-narrow"
          width={46}
          height={46}
          alt="CoreUI Logo"
        >
          <use xlinkHref="assets/brand/coreui.svg#signet" />
        </svg>
      </div>
      <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
        <li className="nav-item">
          <NavLink className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            } to={"/dashboard"} >
            <AiFillDashboard className="nav-icon"></AiFillDashboard>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            } to={"/customer"}>
              
              <FaUserAstronaut className="nav-icon"></FaUserAstronaut>
            Customer
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            } to={"/product"}>
            <MdProductionQuantityLimits className="nav-icon"></MdProductionQuantityLimits>
            Product
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            } to={"/invoice"}>
            <FaFileInvoiceDollar className="nav-icon"></FaFileInvoiceDollar>
            Invoice
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
