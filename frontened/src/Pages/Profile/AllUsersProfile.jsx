import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../helper";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${BASE_URL}/users/getAllUsers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ DELETE USER
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`${BASE_URL}/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.ok) {
                alert("User deleted");
                setUsers(users.filter(user => user._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ SORTING
    const handleSort = (type) => {
        setSortType(type);

        let sorted = [...users];

        if (type === "cart") {
            sorted.sort((a, b) => b.carts.length - a.carts.length);
        }

        if (type === "name") {
            sorted.sort((a, b) => a.fname.localeCompare(b.fname));
        }

        if (type === "recent") {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setUsers(sorted);
    };

    if (loading) return <h2 className="text-center mt-10">Loading users...</h2>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">All Users</h1>

            {/* 🔽 Sorting Controls */}
            <div className="flex gap-4 justify-center mb-6">
                <button onClick={() => handleSort("name")} className="btn">Sort by Name</button>
                <button onClick={() => handleSort("cart")} className="btn">Sort by Cart Size</button>
                <button onClick={() => handleSort("recent")} className="btn">Recently Joined</button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map(user => (
                    <div key={user._id} className="bg-white p-5 rounded-xl shadow-md">

                        {/* 👤 Basic Info */}
                        <h2 className="text-xl font-semibold">{user.fname}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.mobile}</p>

                        <p className="text-sm mt-2 text-gray-500">
                            Role: <span className="font-medium">{user.role}</span>
                        </p>

                        {/* 📦 Address */}
                        <p className="text-sm text-gray-500">
                            {user.address}, {user.pincode}
                        </p>

                        {/* 🛒 Cart Info */}
                        <div className="mt-3">
                            <h3 className="font-medium">Cart Items: {user.carts.length}</h3>

                            <ul className="text-sm text-gray-600 mt-1 max-h-24 overflow-y-auto">
                                {user.carts.map((item, idx) => (
                                    <li key={idx}>
                                        Product ID: {item.productId} | Qty: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 🗑 Delete Button */}
                        <button
                            onClick={() => deleteUser(user._id)}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                            Delete User
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;