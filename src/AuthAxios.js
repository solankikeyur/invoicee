import axios from "axios";
import { Navigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } else {
      return Promise.reject("Please login again.");
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// // Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error && error.response && error.response.status && error.response.status === 401) {
      localStorage.removeItem("token");
      return <Navigate to={"/login"}></Navigate>;
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
