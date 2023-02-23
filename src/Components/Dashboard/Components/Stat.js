import React from "react";

const Stat = ({ count, title, bg = 'bg-secondary' }) => {
  return (
    <div className={`card mb-4 text-white ${bg}`}>
      <div className="card-body pb-0 d-flex justify-content-between align-items-start">
        <div>
          <div className="fs-4 fw-semibold">{count}</div>
          <div style={{ fontSize: "25px" }}>{title}</div>
        </div>
      </div>
      <div className="c-chart-wrapper mt-3 mx-3" style={{ height: 50 }}></div>
    </div>
  );
};

export default Stat;
