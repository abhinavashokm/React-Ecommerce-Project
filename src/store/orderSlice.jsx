import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderService, fetchOrderService } from "../firebase/orderService";
import { clearUserCart } from "../firebase/cartService";

const getUserId = (getState) => getState().auth.user.id

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async (payload, { getState }) => {
        const userId = await getUserId(getState)
        await createOrderService(payload, userId)
        await clearUserCart(userId)
    }
)

export const fetchMyOrders = createAsyncThunk(
    "order/fetchMyorders",
    async (payload, {getState}) => {
        const userId = await getUserId(getState)
        const myOrders = await fetchOrderService(userId)
        return myOrders
    }
)

const orderSlice = createSlice(
    {
        name: "order",
        initialState: {
            myOrders: [],
            loading: true
        },
        extraReducers: (builder) => {
            builder.addCase(fetchMyOrders.pending, (state) => {
                state.loading = true
            }).addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.myOrders = action.payload
                state.loading = false
            }).addCase(fetchMyOrders.rejected, (state) => {
                state.loading = false
            })
        }
    }
)

export default orderSlice.reducer