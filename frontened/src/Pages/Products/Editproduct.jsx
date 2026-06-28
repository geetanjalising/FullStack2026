import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
        quantity: 1
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await fetch(
                `${BASE_URL}/products/${id}`
            );

            const data = await res.json();

            setFormData({
                title: data.title,
                price: data.price,
                category: data.category,
                description: data.description,
                image: data.image,
                quantity: data.quantity
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.name === "price" ||
                    e.target.name === "quantity"
                    ? Number(e.target.value)
                    : e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                `${BASE_URL}/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (res.ok) {
                alert("Product Updated");
                navigate("/manage-products");
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Edit Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Quantity"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        rows="5"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded"
                    >
                        {loading
                            ? "Updating..."
                            : "Update Product"}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default EditProduct;