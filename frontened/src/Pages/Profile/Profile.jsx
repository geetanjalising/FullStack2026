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
        <div style={{ maxWidth: "500px", margin: "auto" }}>
            <h1>User Profile</h1>

            <label>Name</label>
            <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                disabled
            />

            <label>Mobile</label>
            <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
            />

            <label>Address</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
            />

            <label>Pincode</label>
            <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
            />

            <button style={{ marginTop: "15px" }}>
                Update Profile (API later)
            </button>
        </div>
    );
};

export default Profile;
