import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsOfSeller, addProduct, deleteProduct, fetchOtherUsersProducts, editProductService } from "../firebase/productService";

const getUserId = (getState) => getState().auth.user.id
const getUserName = (getState) => getState().auth.user.displayName

export const fetchMyProducts = createAsyncThunk(
    "products/fetchMyProducts",
    async (payload, { getState }) => {
        const userId = getUserId(getState)
        const products = await fetchProductsOfSeller(userId)
        return products
    }
)

export const fetchPublicProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (payload, {getState}) => {
        const userId = getUserId(getState)
        const products = await fetchOtherUsersProducts(userId)
        return products
    }
)

export const sellProduct = createAsyncThunk(
    "products/sellProduct",
    async (payload, { dispatch, getState }) => {
        const userId = getUserId(getState)
        const displayName = getUserName(getState)
        await addProduct({ ...payload, sellerId: userId, sellerName: displayName})
        dispatch(fetchMyProducts())
    }
)

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async (payload, { dispatch }) => {
        await editProductService(payload)
        dispatch(fetchMyProducts())
    }
)

export const removeProduct = createAsyncThunk(
    "products/removeProduct",
    async (payload, { dispatch }) => {
        await deleteProduct(payload)
        dispatch(fetchMyProducts())
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        publicProducts: [],
        myProducts: [],
        loading: true
    },
    reducers: {
        setAllProducts(state, action) {
            state.allProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyProducts.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchMyProducts.fulfilled, (state, action) => {
                state.loading = false
                state.myProducts = action.payload
            }).addCase(fetchMyProducts.rejected, (state) => {
                state.loading = false
            }).addCase(sellProduct.pending, (state) => {
                state.loading = true
            }).addCase(sellProduct.fulfilled, (state) => {
                state.loading = false
            }).addCase(sellProduct.rejected, (state) => {
                state.loading = false
            }).addCase(fetchPublicProducts.pending, (state) => {
                state.loading = true
            }).addCase(fetchPublicProducts.fulfilled, (state, action) => {
                state.loading = false
                state.publicProducts = action.payload
            }).addCase(fetchPublicProducts.rejected, (state) => {
                state.loading = false
            })
    }
})

export const { setAllProducts } = productsSlice.actions
export default productsSlice.reducer
