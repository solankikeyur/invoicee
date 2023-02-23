import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../AuthAxios";
import UserContext from "../../Context/UserContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const { setLoader } = useContext(UserContext);

  useEffect(() => {
    setLoader(true);
    axios
      .get("/product")
      .then(({ data }) => {
        setProducts(data.products);
        setLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setLoader(false);
      });
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure ?")) {
      setLoader(true);
      axios
        .delete(`/product/delete/${productId}`)
        .then(() => {
          setProducts(products.filter(({ id }) => id !== productId));
          setLoader(false);
        })
        .catch((errors) => {
          alert("No product to delete.");
          setLoader(false);
        });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <Link to={"/product/create"} className="btn btn-primary mb-2">
              Create
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table border mb-0">
            <thead className="table-light fw-semibold">
              <tr className="align-middle">
                <th>#ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr className="align-middle" key={product.id}>
                    <td className="text-center">{product.id}</td>
                    <td className="text-center">{product.name}</td>
                    <td className="text-center">
                        <Link
                          to={`/product/edit/${product.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger btn-sm text-white"
                          style={{ marginLeft: "2px" }}
                        >
                          Delete
                        </button>
                      </td>
                  </tr>
                ))
              ) : (
                <tr className="align-middle">
                  <td className="text-center" colSpan={10}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Product;
