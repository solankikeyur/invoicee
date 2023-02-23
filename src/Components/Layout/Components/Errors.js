import React from "react";

const Errors = ({errors}) => {
  if (Object.keys(errors).length > 0) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
      >
        <ul>
          {Object.values(errors).map((errorMsg, index) => (
            <li key={index}>{errorMsg}</li>
          ))}
        </ul>
      </div>
    );
  }
};

export default Errors;
