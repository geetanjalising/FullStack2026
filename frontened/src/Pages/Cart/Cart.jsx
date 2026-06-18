import React from "react";
import { BASE_URL } from "../../helper.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    removeItem,
    increaseQuantity,
    decreaseQuantity
} from "../redux/cartSlice";

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(
        state => state.cart.items
    );
    console.log("Cart items from Redux store:", cartItems);
    const removeCartItem = (id) => async () => {

        dispatch(removeItem(id));

        const res = await fetch(
            `${BASE_URL}/cart/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (!res.ok) {
            console.error(
                "Failed to remove item from cart:",
                id
            );
        }
    };

    const incQty = (productId) => async () => {

        dispatch(increaseQuantity(productId));

        const res = await fetch(
            `${BASE_URL}/cart/increaseQty/${productId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (!res.ok) {
            dispatch(decreaseQuantity(productId));
        }
    };

    const decQty = (productId) => async () => {

        dispatch(decreaseQuantity(productId));

        const res = await fetch(
            `${BASE_URL}/cart/decreaseQty/${productId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        if (!res.ok) {
            dispatch(increaseQuantity(productId));
        }
    };

    const totalSum = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-100 pt-20 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">

                <h1 className="text-2xl font-semibold mb-6">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Your cart is empty
                    </p>
                ) : (
                    <div className="space-y-6">

                        {cartItems.map((e) => (

                            <div
                                key={e.id}
                                className="flex flex-col md:flex-row gap-6 border-b pb-6"
                            >
                                <img
                                    src={e.image}
                                    alt={e.title}
                                    className="w-full md:w-40 h-40 object-contain rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {e.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {e.description}
                                    </p>
                                    <p className="mt-2 font-semibold">
                                        ₹{e.price * e.quantity}.00
                                    </p>
                                    <div className="flex items-center gap-3 mt-4">
                                        <button
                                            onClick={decQty(e.id)}
                                            disabled={e.quantity === 1}
                                            className="px-3 py-1 border rounded hover:bg-gray-100"
                                        >
                                            −
                                        </button>
                                        <span className="font-medium">
                                            {e.quantity}
                                        </span>
                                        <button
                                            onClick={incQty(e.id)}
                                            className="px-3 py-1 border rounded hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={removeCartItem(e.id)}
                                            className="ml-6 text-red-500 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="mt-6 text-right">
                    <p className="text-lg font-semibold">
                        Total: ₹{totalSum}.00
                    </p>
                </div>
                {cartItems.length > 0 && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => navigate("/checkout")}
                            className="bg-yellow-400 px-6 py-2 rounded"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;