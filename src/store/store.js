import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice"
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"

const store = configureStore({
    reducer:{
        products: productsSlice,
        auth: authSlice,
        cart: cartSlice
    }
})

export default store