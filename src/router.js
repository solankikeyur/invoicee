import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./Components/Layout/GuestLayout";
import AuthLayout from "./Components/Layout/AuthLayout";
import Login from "./Components/Auth/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Auth/Register";
import Customer from "./Components/Customer/Customer";
import CustomerForm from "./Components/Customer/CustomerForm";
import Product from "./Components/Product/Product";
import ProductForm from "./Components/Product/ProductForm";
import InvoiceForm from "./Components/Invoice/InvoiceForm";
import Invoice from "./Components/Invoice/Invoice";
import ViewInvoice from "./Components/Invoice/ViewInvoice";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login"></Navigate>
    },
    {
        element: <GuestLayout></GuestLayout>,
        children: [
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
    {
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "customer",
                children:[
                    {
                        path: "",
                        element: <Customer></Customer>
                    },
                    {
                        path: "create",
                        element: <CustomerForm></CustomerForm>
                    },
                    {
                        path: "edit/:id",
                        element: <CustomerForm></CustomerForm>
                    }
                ]
            },
            {
                path: "product",
                children: [
                    {
                        path:"",
                        element: <Product></Product>
                    },
                    {
                        path: "create",
                        element: <ProductForm></ProductForm>
                    },
                    {
                        path: "edit/:id",
                        element: <ProductForm></ProductForm>
                    }
                ]
            },
            {
                path: "invoice",
                children: [
                    {
                        path:"",
                        element: <Invoice></Invoice>
                    },
                    {
                        path: "create",
                        element: <InvoiceForm></InvoiceForm>
                    },
                    {
                        path: "edit/:id",
                        element: <InvoiceForm></InvoiceForm>
                    }
                ]
            }
        ]
    },
    {
        path: "/invoice/view/:id",
        element: <ViewInvoice></ViewInvoice>
    }
]);

export default router;