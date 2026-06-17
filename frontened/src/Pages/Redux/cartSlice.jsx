import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        setCart(state, action) {
            state.items = action.payload;
        },

        addToCart(state, action) {
            const existingItem = state.items.find(
                item => item.productId === action.payload.productId
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                });
            }
        },

        increaseQuantity(state, action) {
            const item = state.items.find(
                item => item.productId === action.payload
            );

            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQuantity(state, action) {
            const item = state.items.find(
                item => item.productId === action.payload
            );

            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter(
                item => item.productId !== action.payload
            );
        },

        clearCart(state) {
            state.items = [];
        }
    }
});

export const {
    setCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;