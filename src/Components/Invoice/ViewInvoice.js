import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/invoice.css";
import axios from "../../AuthAxios";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../Layout/Components/Loader";

const ViewInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState({});
  const { setLoader, loader } = useContext(UserContext);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (id) {
      setLoader(true);
      axios
        .get(`/invoice/${id}`)
        .then(({ data }) => {
          setLoader(false);
          if (data.invoice) setInvoice(data.invoice);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, []);

  return (
    <div className="receipt-content">
      <Loader show={loader}  ></Loader>
      <div className="container bootstrap snippets bootdey">
        <div className="row">
          <div className="col-md-12">
            <div className="invoice-wrapper">
              <div className="payment-info">
                <div className="row">
                  <div className="col-6">
                    <span>Invoice No.</span>
                    <strong>#{invoice.id ? invoice.id : "-"}</strong>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <span>Created Date</span>
                    <strong>
                      {invoice.created_at ? invoice.created_at : "-"}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="payment-details">
                <div className="row">
                  <div className="col-6">
                    <span>From</span>
                    <strong>
                      {invoice.customer_name ? invoice.customer_name : "-"}
                    </strong>
                    <p>
                      989 5th Avenue <br />
                      City of monterrey <br />
                      55839 <br />
                      USA <br />
                      <a href="#">jonnydeff@gmail.com</a>
                    </p>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <span>To</span>
                    <strong>
                      {invoice.customer_name ? invoice.customer_name : "-"}
                    </strong>
                    <p>
                      344 9th Avenue <br />
                      San Francisco <br />
                      99383 <br />
                      USA <br />
                      <a href="#">juanfer@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="line-items">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="table-light fw-semibold">
                      <tr className="align-middle">
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th style={{ textAlign: "right" }}>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoice.items && invoice.items.length > 0 ? (
                        invoice.items.map((item) => (
                          <tr className="align-middle" key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.rate}</td>
                            <td style={{ textAlign: "right" }}>{ item.qty * item.rate }</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="text-center" colSpan={10}>
                            No items found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="total" style={{ textAlign: "right" }}>
                  <div className="field grand-total">
                    Total <span>{ invoice.total_amount ? invoice.total_amount : 0 }</span>
                  </div>
                </div>
                <div className="print">
                  <button className="btn btn-primary" onClick={handlePrint}>
                    <i className="fa fa-print" />
                    Print this receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoice;
