import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice"
import authSlice from "./authSlice"
import cartSlice from "./cartSlice"
import orderSlice from './orderSlice'

const store = configureStore({
    reducer:{
        products: productsSlice,
        auth: authSlice,
        cart: cartSlice,
        order: orderSlice
    }
})

export default store