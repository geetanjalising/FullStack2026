import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // For editable form
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

    // 👇 THIS IS THE IMPORTANT PART YOU ASKED ABOUT
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <h2>Loading profile...</h2>;

    if (!user) return <h2>User not found</h2>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12 px-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    User Profile
                </h1>

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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Button */}
                <button
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                    Update Profile (API later)
                </button>
                <br />
                <button
                    className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                >
                    View All Users Data
                </button>
            </div>
        </div>
    );

};

export default Profile;
