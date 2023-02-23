import React, { useContext, useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../AuthAxios";
import UserContext from "../../Context/UserContext";
import Errors from "../Layout/Components/Errors";

const CreateInvoice = () => {
  let initialItem = {
    id: "",
    qty: 0,
    rate: 0,
  };
  const [items, setItems] = useState([initialItem]);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const { setLoader } = useContext(UserContext);
  const [customer, setCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleItemChange = (inputIndex, e) => {
    if (e.target.name === "qty") {
      updateItem(inputIndex, "qty", e.target.value);
    } else if (e.target.name === "id") {
      updateItem(inputIndex, "id", e.target.value);
    } else if (e.target.name === "rate") {
      updateItem(inputIndex, "rate", e.target.value);
    }
  };

  const updateItem = (inputIndex, key, value) => {
    setItems(
      items.map((item, index) => {
        if (index === inputIndex) {
          item[key] = value;
          return item;
        }
        return item;
      })
    );
  };

  const handleAddItem = () => {
    setItems(items.concat(initialItem));
  };

  const handleDeleteItem = (inputIndex) => {
    let updatedItems = items.filter((item, index) => {
      return index !== inputIndex;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    setLoader(true);
    if (id) {
      axios
        .get(`/invoice/${id}`)
        .then(({ data }) => {
          if (data.invoice) {
            if (data.invoice.customer_id) setCustomer(data.invoice.customer_id);
            if (data.invoice.items) setItems(data.invoice.items);
          }
          setLoader(false);
        })
        .catch((error) => {
          console.log(error);
          setLoader(false);
        });
    }
  }, []);
  useEffect(() => {
    const calculateTotal = () => {
      let totalAmount = 0;
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          totalAmount += items[i]["qty"] * items[i]["rate"];
        }
      }
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [items]);

  const getProducts = () => {
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
  };

  const getCustomers = () => {
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
  };

  useEffect(() => {
    setLoader(true);
    getProducts();
    setLoader(true);
    getCustomers();
  }, []);

  const handleRefresh = () => {
    setLoader(true);
    getProducts();
  };

  const handleSave = () => {
    let url = "/invoice/create";
    if(id) url = `/invoice/edit/${id}`;
    if (!customer) {
      alert("Please select customer.");
      return false;
    }
    if (items.length <= 0) {
      alert("Please add items.");
    }
    const invoiceData = {
      products: items,
      customer_id: customer,
    };
    setLoader(true);
    axios
      .post(url, invoiceData)
      .then(() => {
        setLoader(false);
        setErrors({});
        return navigate("/invoice");
      })
      .catch((errors) => {
        const response = errors.response;
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
        setLoader(false);
      });
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label className="h6">Bill To *</label>
                <select
                  className="form-control form-select"
                  onChange={(e) => {
                    setCustomer(e.target.value);
                  }}
                  value={customer}
                >
                  <option>-- Select Customer --</option>
                  {customers.length > 0 &&
                    customers.map((customer) => (
                      <option value={customer.id} key={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Item Info */}
      <div className="card mt-4">
        <div className="card-body">
          <Errors errors={errors}></Errors>
          <button className="btn btn-primary mb-2" onClick={handleAddItem}>
            Add Item ({items.length})
          </button>
          <button
            className="btn btn-secondary mb-2"
            style={{ marginLeft: "10px" }}
          >
            Add New Product
          </button>
          <button
            className="btn btn-outline-info mb-2"
            style={{ marginLeft: "10px" }}
            onClick={handleRefresh}
          >
            Refresh
          </button>
          <div className="table-responsive">
            <table className="table border mb-0">
              <thead className="table-light fw-semibold">
                <tr className="align-middle">
                  <th className="text-center">Product Name</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Rate</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center"></th>
                </tr>
              </thead>
              <tbody>
                {items.length <= 0 && (
                  <tr className="align-middle">
                    <td className="text-center" colSpan={"10"}>
                      Please add items
                    </td>
                  </tr>
                )}
                {items.map((item, index) => (
                  <tr data-id={index} className="align-middle" key={index}>
                    <td className="text-center">
                      <select
                        name="id"
                        onChange={(e) => handleItemChange(index, e)}
                        value={item.id}
                      >
                        <option value="">-- Select Product --</option>
                        {products.length > 0 &&
                          products.map((product) => (
                            <option value={product.id} key={product.id}>
                              {product.name}
                            </option>
                          ))}
                      </select>
                    </td>
                    <td className="text-center">
                      <input
                        type={"number"}
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, e)}
                      ></input>
                    </td>
                    <td className="text-center">
                      <input
                        type={"number"}
                        name="rate"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, e)}
                      ></input>
                    </td>
                    <td className="text-center">
                      <span>{item.qty * item.rate}</span>
                    </td>
                    <td className="text-center">
                      <span
                        style={{
                          color: "red",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDeleteItem(index)}
                      >
                        <TiDelete></TiDelete>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6"></div>
            <div className="col-12 col-md-6 col-lg-6">
              <table
                className="table table-border"
                style={{ textAlign: "right", background: "#c7c7c7" }}
              >
                <tbody>
                  <tr>
                    <td>
                      <h5>Total</h5>
                    </td>
                    <td>
                      <h5>{total}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {items.length > 0 && (
            <div className="" style={{ float: "right" }}>
              <button
                className="btn btn-primary"
                style={{ marginRight: "10px" }}
                onClick={handleSave}
              >
                Save
              </button>
              <Link to={"/invoice"} className="btn btn-danger text-white">Cancel</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
