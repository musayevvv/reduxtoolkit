import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

export const getProductThunk = createAsyncThunk('/get/product', async () => {
    const res = await axios.get('https://northwind.vercel.app/api/categories')


    return res.data
})

export const postProductThunk = createAsyncThunk('/post/product', async (newProduct) => {
    const res = await axios.post('https://northwind.vercel.app/api/categories', newProduct)
    return res.data
})

export const deleteProductThunk = createAsyncThunk('delete/product', async (id) => {
    await axios.delete(`https://northwind.vercel.app/api/categories/${id}`)
    console.log('thunk', id);

    return id
})


export const updateProductThunk = createAsyncThunk('update/product', async ({ id, updatedData }) => {
    const res = await axios.put(`https://northwind.vercel.app/api/categories/${id}`, updatedData)
    return res.data
})


const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //GET
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
            //POST
            .addCase(postProductThunk.fulfilled, (state, action) => {
                state.products.push(action.payload)
            })
            //DELETE
            .addCase(deleteProductThunk.fulfilled, (state, action) => {
                state.products = state.products.filter(data => data.id != action.payload)
            })
            //UPDATE
            .addCase(updateProductThunk.fulfilled, (state, action) => {
                const index = state.products.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.products[index] = action.payload
                }
            })

    }
})

export default productSlice.reducer