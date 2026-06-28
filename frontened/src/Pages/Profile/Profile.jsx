import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
    NavLink
} from "react-router-dom";
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAdmin = user?.role === "admin";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: "",
        email: "",
        mobile: "",
        address: "",
        pincode: ""
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`${BASE_URL}/users/userdata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();
            setUser(data);
            setFormData({
                fname: data.fname || "",
                email: data.email || "",
                mobile: data.mobile || "",
                address: data.address || "",
                pincode: data.pincode || ""
            });
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ✅ UPDATE PROFILE FUNCTION
    const handleUpdate = async () => {
        try {
            const res = await fetch(`${BASE_URL}/users/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile updated successfully", { position: "top-center" });
                fetchUserProfile(); // refresh data
            } else {
                toast.warn(data.message || "Update failed", { position: "top-center" });
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Something went wrong");
        }
    };

    if (loading) return <h2>Loading profile...</h2>;
    if (!user) return <h2>User not found</h2>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    User Profile
                </h1>
                {
                    isAdmin && (<div className="flex justify-center mb-6">
                        <button
                            onClick={() => navigate("/add-product")}
                            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            + Add Product
                        </button>
                    </div>)
                }
                {isAdmin && (
                    <button
                        onClick={() => navigate("/manage-products")}
                        className="w-full mt-4 bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700"
                    >
                        Manage Products
                    </button>
                )}

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                </div>

                {/* Mobile */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Mobile
                    </label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* Pincode */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Pincode
                    </label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>

                {/* ✅ UPDATE BUTTON */}
                <button
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
                >
                    Update Profile
                </button>

                <NavLink to={`/orders/${user._id}`}>
                    <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 mt-4"> My Orders</button>
                </NavLink>

                {/* ✅ ADMIN ONLY BUTTON */}
                {isAdmin && (
                    <button
                        onClick={() => navigate("/all-users")}
                        className="w-full mt-4 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700"
                    >
                        View All Users Data
                    </button>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;