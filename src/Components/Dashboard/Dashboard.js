/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import Stat from "./Components/Stat";
import UserContext from "../../Context/UserContext";

const Dashboard = () => {
  const {setLoader} = useContext(UserContext);
  useEffect(() => {
    setLoader(false);
  },[]);
  return ( 
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <Stat count={"26"} title={"Customer"} bg={'bg-primary'}></Stat>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Stat count={"26"} title={"Product"} bg={'bg-danger'}></Stat>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Stat count={"26"} title={"Invoice"} bg={'bg-success'}></Stat>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
