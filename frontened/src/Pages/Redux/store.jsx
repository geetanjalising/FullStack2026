import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        checkout: checkoutReducer
    }
});
