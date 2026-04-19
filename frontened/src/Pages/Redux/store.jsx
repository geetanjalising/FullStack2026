import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import checkoutReducer from "./checkoutSlice";

//currenly using redux only for product list, not for cart or checkout. Cart and checkout are directly fetching from backend.

export const store = configureStore({
    reducer: {
        products: productsReducer,
        //    checkout: checkoutReducer
    }
});
