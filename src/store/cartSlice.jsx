import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCartService, fetchUserCartService, deleteFromCartService } from "../firebase/cartService";

const getUserId = (getState) => getState().auth.user.id

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (payload, {dispatch, getState}) => {
        const userId = getUserId(getState)
        await addToCartService({...payload, userId})
        dispatch(fetchMyCart())
    }
)

export const fetchMyCart = createAsyncThunk(
    "cart/fetchMyCart",
    async (payload, {getState}) => {
        const userId = getUserId(getState)
        const cartItems = await fetchUserCartService(userId)
        return cartItems
    }
)

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (payload, { dispatch }) => {
        await deleteFromCartService(payload)
        dispatch(fetchMyCart())
    }
)

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: {
        items: [],
        loading: true
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyCart.pending, (state) => {
            state.loading = true
        }).addCase(fetchMyCart.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
        }).addCase(fetchMyCart.rejected, (state) => {
            state.loading = false
        })
    }
})

export default cartSlice.reducer