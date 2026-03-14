import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice"
import authSlice from "./authSlice"

const store = configureStore({
    reducer:{
        products: productsSlice,
        auth: authSlice
    }
})

export default store