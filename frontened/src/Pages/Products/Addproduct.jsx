import React, { useState } from "react";
import { BASE_URL } from "../../helper";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
        quantity: 1
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.name === "price" ||
                    e.target.name === "quantity"
                    ? Number(e.target.value)
                    : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                ...formData,
                rating: {
                    rate: 0,
                    count: 0
                }
            };

            const response = await fetch(
                `${BASE_URL}/products/addproduct`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to add product"
                );
            }

            alert("Product added successfully!");
            navigate("/profile");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async e => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();

        formData.append("image", file);

        try {
            setLoading(true);

            const res = await fetch(
                `${BASE_URL}/upload/image`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await res.json();

            setFormData(prev => ({
                ...prev,
                image: data.imageUrl
            }));

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Add New Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter product title"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter price"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-3"
                        >
                            <option value="">
                                Select Category
                            </option>

                            <option value="electronics">
                                Electronics
                            </option>

                            <option value="men's clothing">
                                Men's Clothing
                            </option>

                            <option value="women's clothing">
                                Women's Clothing
                            </option>

                            <option value="jewelery">
                                Jewellery
                            </option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="1"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={loading}
                        />

                        {loading && (
                            <p className="text-blue-600 mt-2">
                                Uploading image...
                            </p>
                        )}
                    </div>

                    {formData.image && (
                        <div>
                            <p className="font-medium mb-2">
                                Preview
                            </p>

                            <img
                                src={formData.image}
                                alt="Preview"
                                className="h-48 object-contain border rounded-lg mx-auto"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter product description"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                    >
                        {loading
                            ? "Adding Product..."
                            : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;