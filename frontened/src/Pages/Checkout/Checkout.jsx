import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { BASE_URL } from "../../helper.js";
import { LoginContext } from '../Context/ContextProvider'
import { useContext } from "react";

export default function Checkout() {
    const { account, setAccount } = useContext(LoginContext);
    const [checkoutItems, setCheckoutItems] = useState([]);
    const getCheckoutItems = async () => {
        const res = await fetch(`${BASE_URL}/cart/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        const data = await res.json();
        setCheckoutItems(data);
    }

    useEffect(() => {
        getCheckoutItems();
    }, []);


    // ✅ Calculate total
    const totalSum = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const [loading, setLoading] = useState(false);
    // ✅ Place Order Handler (for now mock)
    const handlePlaceOrder = async () => {
        try {
            // 1️⃣ Call backend to create order
            const res = await fetch(`${BASE_URL}/payment/create-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ amount: totalSum })
            });

            const data = await res.json();
            console.log("Order created:", data); // Debug log
            // 2️⃣ Razorpay options
            const options = {
                key: "rzp_test_SfID21calHIw4T", // from Razorpay dashboard
                amount: data.amount,
                currency: data.currency,
                name: "Shopping App",
                description: "Test Transaction",
                order_id: data.id,

                handler: async function (response) {
                    console.log("Payment Success:", response);
                    const verifyRes = await fetch(`${BASE_URL}/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            ...response,
                            checkoutItems,
                            totalSum,
                            userId: account._id
                        })
                    });

                    const result = await verifyRes.json();

                    if (result.success) {
                        alert("Order Placed Successfully!");
                    } else {
                        alert("Payment verification failed!");
                    }
                    alert("Payment Successful!");
                },

                prefill: {
                    name: account.fname,
                    email: account.email,
                    contact: account.phone
                },

                theme: {
                    color: "#000"
                }
            };

            // 3️⃣ Open Razorpay popup
            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err) {
            console.error(err);
            alert("Error in payment");
        }
    };

    // ❗ Safety check
    if (checkoutItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    No items to checkout
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 pt-24 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                <div className="bg-white p-6 rounded-2xl shadow flex flex-col">

                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>

                    {/* Items */}
                    <div className="space-y-4 max-h-64 overflow-y-auto">
                        {checkoutItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 object-contain bg-gray-50 p-2 rounded"
                                />
                                <div className="flex-1">
                                    <p className="text-sm line-clamp-2">
                                        {item.title}
                                    </p>
                                    <p className="font-semibold">
                                        ₹{item.price}
                                    </p>
                                </div>
                                <p className="text-sm">
                                    x{item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>

                    <hr className="my-4" />

                    {/* Total */}
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{totalSum}</span>
                    </div>


                    {/* Button */}
                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>

                </div>

            </div>
        </div>
    );
}