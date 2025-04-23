import { configureStore } from "@reduxjs/toolkit/react";
import productSlice from './reducer/productSlice.js'

export const store = configureStore({
    reducer: {
        products: productSlice
    }
})