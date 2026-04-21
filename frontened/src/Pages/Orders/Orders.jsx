import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";
import { useParams } from "react-router-dom";

const Orders = () => {
    const { id } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${BASE_URL}/payment/orders/${id}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-gray-600 text-lg">
                        🛒 You haven’t placed any orders yet
                    </p>
                    <button className="mt-4 px-6 py-2 bg-black text-white rounded">
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center border-b pb-3">
                                <div>
                                    <p className="text-sm text-gray-500">Order ID</p>
                                    <p className="font-medium">{order._id}</p>
                                </div>

                                <span
                                    className={`px-3 py-1 text-sm rounded-full ${order.status === "PLACED"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order.status === "DELIVERED"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {/* Order Info */}
                            <div className="mt-3 flex justify-between text-sm text-gray-600">
                                <p>₹{order.totalAmount}</p>
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            {/* Items */}
                            <div className="mt-4 space-y-3">
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 border p-2 rounded"
                                        >
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-16 h-16 object-cover rounded"
                                            />

                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    ₹{item.price} × {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-red-500 text-sm">
                                        No items found (fix cart issue)
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;