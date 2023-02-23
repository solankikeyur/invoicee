import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../../axios";
import Errors from "../Layout/Components/Errors";
import UserContext from "../../Context/UserContext";

const Register = () => {
  const [errors, setErrors] = useState({});
  const {setLoader, loader} = useContext(UserContext);
  const navigate = useNavigate();
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().label("Name").required(),
      email: Yup.string().email().label("Email").required(),
      password: Yup.string().label("Password").required(),
      password_confirmation: Yup.string().label("Confirm Password").required(),
    }),
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: ({ name, email, password, password_confirmation }) => {
      setLoader(true);
      axios
        .post("/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          setLoader(false);
          alert("Successfully registered. Login to continue.");
          return navigate("/login");
        })
        .catch((error) => {
          const response = error.response;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
        setLoader(false);
        });
    },
  });

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mb-4 mx-4">
              <div className="card-body p-4">
                <h1>Register</h1>
                <p className="text-medium-emphasis">Create your account</p>
                <Errors errors={errors}></Errors>
                <form onSubmit={formik.handleSubmit}>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-user" />
                      </svg>
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        Please provide a valid name.
                      </div>
                    )}
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-envelope-open" />
                      </svg>
                    </span>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        Please provide a valid email.
                      </div>
                    )}
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-lock-locked" />
                      </svg>
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block" }}
                      >
                        Please provide a valid password.
                      </div>
                    )}
                  </div>
                  <div className="input-group mb-4">
                    <span className="input-group-text">
                      <svg className="icon">
                        <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-lock-locked" />
                      </svg>
                    </span>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Repeat password"
                      name="password_confirmation"
                      value={formik.values.password_confirmation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.password_confirmation &&
                      formik.errors.name && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          Please enter password again.
                        </div>
                      )}
                  </div>
                  <button className="btn btn-block btn-primary" type="submit" disabled={loader ? true : false}>
                    Create Account
                  </button>
                  <Link
                    to={"/login"}
                    className="btn btn-block btn-secondary"
                    type="button"
                    style={{ marginLeft: "5px" }}
                  >
                    Back To Login
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
