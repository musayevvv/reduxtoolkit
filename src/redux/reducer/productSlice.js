import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getProductThunk = createAsyncThunk('/get/product', async () => {
    const res = await axios.get('https://fakestoreapi.com/products')
    console.log('thunk',res.data);
    
    return res.data
})

export const postProductThunk = createAsyncThunk('/post/product', async (newProduct) => {
    const res = await axios.post('https://northwind.vercel.app/api/categories',newProduct)    
    return res.data
})


const productSlice = createSlice({
    name: 'products',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductThunk.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(getProductThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getProductThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(postProductThunk.fulfilled,(state,action)=>{
                state.products.push(action.payload)
            })
    }
})

export default productSlice.reducer