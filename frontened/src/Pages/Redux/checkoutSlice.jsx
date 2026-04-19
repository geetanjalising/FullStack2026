import { createSlice } from "@reduxjs/toolkit";


//not using

const initialState = {
    items: []
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setCheckoutItems(state, action) {
            state.items = action.payload;
        },
        clearCheckout(state) {
            state.items = [];
        }
    }
});

export const { setCheckoutItems, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;