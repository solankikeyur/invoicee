import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axios from "../../AuthAxios";
import UserContext from "../../Context/UserContext";
import Errors from "../Layout/Components/Errors";

const ProductForm = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {setLoader, loader} = useContext(UserContext);
  const { id } = useParams();
  let url = "/product/create";
  const formik = useFormik({
    validationSchema: Yup.object({
      name: Yup.string().required().label("Name"),
    }),
    initialValues: {
      name: "",
    },
    onSubmit: ({ name }) => {
      setLoader(true);
      if (id) url = `/product/edit/${id}`;

      axios
        .post(url, {
          name: name,
        })
        .then(() => {
          setLoader(false);
          return navigate("/product");
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
        .get(`/product/${id}`)
        .then(({ data }) => {
          const product = data.product;
          formik.setValues({
            name: product.name,
          });
          setLoader(false);
        })
        .catch((errors) => {
          setLoader(false);
          alert("No product found.");
          return navigate("/product");
        });
    }
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
          <div className="col-12">
            {id ? <h2>Edit Product</h2> : <h2>Create Product</h2>}
          </div>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-control"
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
          <button type="submit" className="btn btn-primary" disabled={loader ? true : false}>
            Save
          </button>
          <Link
            to={"/product"}
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

export default ProductForm;
