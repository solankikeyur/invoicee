import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../AuthAxios";
import Errors from "../Layout/Components/Errors";
import UserContext from "../../Context/UserContext";

const CustomerForm = () => {
  const { setLoader, loader } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  let url = "/customer/create";
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required().label("Name"),
      email: Yup.string().email().label("Email"),
      mobile: Yup.number().label("Mobile").positive(),
    }),
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      address: "",
    },
    onSubmit: ({ name, email, mobile, address }) => {
      setLoader(true);
      if (id) url = `/customer/edit/${id}`;

      axios
        .post(url, {
          name: name,
          email: email,
          mobile: mobile,
          address: address,
        })
        .then(() => {
          setLoader(false);
          return navigate("/customer");
        })
        .catch((errors) => {
          const response = errors.response;
          if (response.status === 422) {
            setErrors(response.data.errors);
          }
          setLoader(false);
        });
    },
  });

  useEffect(() => {
    if (id) {
      setLoader(true);
      axios
        .get(`/customer/${id}`)
        .then(({ data }) => {
          const customer = data.customer;
          formik.setValues({
            name: customer.name,
            email: customer.email,
            mobile: customer.mobile,
            address: customer.address,
          });
          setLoader(false);
        })
        .catch((errors) => {
          setLoader(false);
          alert("No customer found.");
          return navigate("/customer");
        });
    }
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            {id ? <h2>Edit Customer</h2> : <h2>Create Customer</h2>}
          </div>
        </div>
        <hr></hr>
        <Errors errors={errors}></Errors>
        <form onSubmit={formik.handleSubmit}>
          <div className="row mb-2">
            <div className="col-12">
              <div className="form-group">
                <label>Name</label>
                <input
                  type={"text"}
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                ></input>
                {formik.touched.name && formik.errors.name && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="form-group">
                <label>Email</label>
                <input
                  type={"text"}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="form-control"
                ></input>
                {formik.touched.email && formik.errors.email && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please provide a valid email.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type={"number"}
                  className="form-control"
                  name="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                ></input>
                {formik.touched.mobile && formik.errors.mobile && (
                  <div
                    className="invalid-feedback"
                    style={{ display: "block" }}
                  >
                    Please provide a valid mobile.
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <div className="form-group">
                <label>Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                ></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loader}>
            Save
          </button>
          <Link
            to={"/customer"}
            className="btn btn-danger text-white"
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
