import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MyAxios from "../../axios";
import Errors from "../Layout/Components/Errors";
import axios from "axios";
import UserContext from "../../Context/UserContext";

const Login = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, setLoader, loader } = useContext(UserContext);

  const formik = useFormik({
    validationSchema: Yup.object({
      email: Yup.string().email().label("Email").required(),
      password: Yup.string().label("Password").required(),
    }),
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      setLoader(true);

      MyAxios.post("/login", {
        email: email,
        password: password,
      })
        .then((response) => {
          const TOKEN_DETAILS = {
            client_id: "98631afd-a407-4047-be29-d4f7945499b9",
            client_secret: "5mpXPKK3BSsvSC0jsf71LNIZCplLlx8qFSjqzXmm",
            grant_type: "password",
            username: email,
            password: password,
          };
          axios
            .post("http://127.0.0.1:8000/oauth/token", TOKEN_DETAILS)
            .then(async (response) => {
              const { access_token } = await response.data;
              setToken(access_token);
              return navigate("/dashboard");
            })
            .catch((error) => {
              console.log(error);
              setLoader(false);
            });
        })
        .catch((error) => {
          const response = error.response;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
          alert(response.data.message);
          setLoader(false);
        });
    },
  });
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-group d-block d-md-flex row">
              <div className="card col-md-7 p-4 mb-0">
                <div className="card-body">
                  <h1>Login</h1>
                  <p className="text-medium-emphasis">
                    Sign In to your account
                  </p>
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
                    <div className="input-group mb-4">
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
                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary px-4" type="submit" disabled={loader ? true : false}>
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card col-md-5 text-white bg-primary py-5">
                <div className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Not having account yet ?</p>
                    <Link
                      className="btn btn-lg btn-outline-light mt-3"
                      type="button"
                      to={"/register"}
                    >
                      Register Now!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
