import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../AuthAxios";
import UserContext from "../../Context/UserContext";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const { setLoader } = useContext(UserContext);
  useEffect(() => {
    setLoader(true);
    axios
      .get("/customer")
      .then(({ data }) => {
        setCustomers(data.customers);
        setLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setLoader(false);
      });
  }, []);

  const handleDelete = (customerId) => {
    if (window.confirm("Are you sure ?")) {
      setLoader(true);
      axios
        .delete(`/customer/delete/${customerId}`)
        .then(() => {
          setCustomers(customers.filter(({ id }) => id !== customerId));
          setLoader(false);
        })
        .catch((errors) => {
          alert("No customer to delete.");
          setLoader(false);
        });
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <Link to={"/customer/create"} className="btn btn-primary mb-2">
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
                <th className="text-center">E-mail</th>
                <th className="text-center">Mobile</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => {
                  return (
                    <tr className="align-middle" key={customer.id}>
                      <td className="text-center">{customer.id}</td>
                      <td className="text-center">{customer.name}</td>
                      <td className="text-center">{customer.email ?? "-"}</td>
                      <td className="text-center">{customer.mobile ?? "-"}</td>
                      <td className="text-center">
                        <Link
                          to={`/customer/edit/${customer.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="btn btn-danger btn-sm text-white"
                          style={{ marginLeft: "2px" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
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

export default Customer;
