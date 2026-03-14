import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import SignUpPage from "../pages/SignUpPage";
import CartPage from "../pages/CartPage";
import SellPage from "../pages/SellPage"

const router = createBrowserRouter([
    {
        element: <AuthLayout/>,
        children: [
            {
                path:"/login",
                element: <LoginPage/>
            },
            {
                path:"/signup",
                element: <SignUpPage/>
            }
        ]
    },
    {
        element: <MainLayout/>,
        children: [
            {path:"/", element:<LandingPage/>},
            {path:"/cart", element: <CartPage/> },
            {path:"/sell-products", element: <SellPage/>}
        ]
    }
])

export default router