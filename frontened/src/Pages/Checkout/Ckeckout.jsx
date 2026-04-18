import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCheckout } from "../Redux/checkoutSlice";

export default function Checkout() {
    const dispatch = useDispatch();

    // ✅ Get checkout items from Redux
    const checkoutItems = useSelector(state => state.checkout.items);

    // ✅ Calculate total
    const totalSum = checkoutItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // ✅ Address State
    const [address, setAddress] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        addressLine: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    // ✅ Place Order Handler (for now mock)
    const handlePlaceOrder = async () => {
        if (!address.name || !address.phone || !address.addressLine) {
            alert("Please fill required fields");
            return;
        }

        setLoading(true);

        try {
            // 👉 Later replace with Razorpay integration
            console.log("Order Data:", {
                items: checkoutItems,
                total: totalSum,
                address
            });

            alert("Order placed successfully!");

            dispatch(clearCheckout()); // clear after success

        } catch (err) {
            console.error(err);
            alert("Payment failed");
        }

        setLoading(false);
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

                {/* LEFT: Address */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Shipping Details
                    </h2>

                    <div className="space-y-4">
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={address.name}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            value={address.email}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            value={address.phone}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        <input
                            name="city"
                            placeholder="City"
                            value={address.city}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />

                        <textarea
                            name="addressLine"
                            placeholder="Full Address"
                            value={address.addressLine}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                        />
                    </div>
                </div>

                {/* RIGHT: Order Summary */}
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

                    {/* Payment Options */}
                    <div className="mt-6 space-y-2">
                        <p className="font-medium">Payment Method</p>

                        <label className="flex items-center gap-2">
                            <input type="radio" defaultChecked />
                            UPI / Card / Net Banking
                        </label>

                        <label className="flex items-center gap-2">
                            <input type="radio" />
                            Cash on Delivery
                        </label>
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