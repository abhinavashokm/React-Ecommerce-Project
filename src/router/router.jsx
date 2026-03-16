import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import SellPage from "../pages/SellPage"
import CheckoutPage from "../pages/CheckoutPage";
import MyOrders from "../pages/MyOrdersPage";
import { RouteErrorBoundary } from "../errorComponents/RouteErrorBoundary";

const router = createBrowserRouter([
    {
        element: <RouteErrorBoundary global={true}><AuthLayout /></RouteErrorBoundary>,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/signup",
                element: <SignUpPage />
            }
        ]
    },
    {
        element: <RouteErrorBoundary global={true} ><MainLayout /></RouteErrorBoundary>,
        children: [
            { path: "/", element: <LandingPage /> },
            { path: "/cart", element: <RouteErrorBoundary><CartPage /></RouteErrorBoundary> },
            { path: "/sell-products", element: <RouteErrorBoundary><SellPage /></RouteErrorBoundary> },
            { path: "/checkout", element: <CheckoutPage /> },
            { path: "/my-orders", element: <RouteErrorBoundary ><MyOrders /></RouteErrorBoundary> }
        ]
    }
])

export default router