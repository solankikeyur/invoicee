import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import axios from "../../AuthAxios";

const Invoice = () => {
  const { setLoader } = useContext(UserContext);

  const [invoices, setInvoices] = useState([]);

  const handleDelete = (invoiceId) => {
    if (window.confirm("Are you sure ?")) {
      setLoader(true);
      axios
        .delete(`/invoice/delete/${invoiceId}`)
        .then(() => {
          setInvoices(invoices.filter(({ id }) => id !== invoiceId));
          setLoader(false);
        })
        .catch((errors) => {
          alert("No invoice to delete.");
          setLoader(false);
        });
    }
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get("/invoice")
      .then(({ data }) => {
        setInvoices(data.invoices);
        setLoader(false);
      })
      .catch((errors) => {
        console.log(errors);
        setLoader(false);
      });
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <Link to={"/invoice/create"} className="btn btn-primary mb-2">
              Create
            </Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table border mb-0">
            <thead className="table-light fw-semibold">
              <tr className="align-middle">
                <th>#ID</th>
                <th className="text-center">Customer Name</th>
                <th className="text-center">Total Amount</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr className="align-middle" key={invoice.id}>
                    <td className="text-center">{invoice.id}</td>
                    <td className="text-center">{invoice.customer_name}</td>
                    <td className="text-center">{invoice.total_amount}</td>
                    <td className="text-center">
                    <Link
                        to={`/invoice/view/${invoice.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/invoice/edit/${invoice.id}`}
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: "2px" }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(invoice.id)}
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

export default Invoice;
