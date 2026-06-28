import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${BASE_URL}/products`);
            const data = await res.json();

            setProducts(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (_id) => {
        const confirmDelete = window.confirm(
            "Delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${BASE_URL}/products/${_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                fetchProducts();
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto bg-white shadow rounded-xl p-6">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Manage Products
                    </h1>

                    <button
                        onClick={() => navigate("/add-product")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Add Product
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3">Image</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Qty</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr
                                    key={product._id}
                                    className="border-b"
                                >
                                    <td className="p-3">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-16 w-16 object-contain"
                                        />
                                    </td>

                                    <td className="p-3">
                                        {product.title}
                                    </td>

                                    <td className="p-3">
                                        ₹{product.price}
                                    </td>

                                    <td className="p-3">
                                        {product.quantity}
                                    </td>

                                    <td className="p-3 flex gap-2">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/edit-product/${product._id}`
                                                )
                                            }
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageProducts;