import React, { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../../helper";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState("recent");
    const [search, setSearch] = useState("");

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

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BASE_URL}/users/deleteUser/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.ok) {
                setUsers(prev =>
                    prev.filter(user => user._id !== id)
                );
                alert("User deleted successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredUsers = useMemo(() => {
        let filtered = [...users];

        if (search.trim()) {
            filtered = filtered.filter(user =>
                user.fname?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase()) ||
                user.mobile?.includes(search)
            );
        }

        switch (sortType) {
            case "name":
                filtered.sort((a, b) =>
                    a.fname.localeCompare(b.fname)
                );
                break;

            case "cart":
                filtered.sort(
                    (a, b) =>
                        (b.carts?.length || 0) -
                        (a.carts?.length || 0)
                );
                break;

            case "recent":
                filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );
                break;

            default:
                break;
        }

        return filtered;
    }, [users, sortType, search]);

    const totalUsers = users.length;
    const totalAdmins = users.filter(
        user => user.role === "admin"
    ).length;

    const usersWithCart = users.filter(
        user => user.carts?.length > 0
    ).length;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-xl font-semibold">
                    Loading Users...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <h1 className="text-4xl font-bold text-center mb-8">
                User Management
            </h1>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Total Users
                    </h3>
                    <p className="text-3xl font-bold">
                        {totalUsers}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Admin Users
                    </h3>
                    <p className="text-3xl font-bold text-red-500">
                        {totalAdmins}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <h3 className="text-gray-500">
                        Users With Cart
                    </h3>
                    <p className="text-3xl font-bold text-green-500">
                        {usersWithCart}
                    </p>
                </div>

            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, email or mobile..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full md:w-96 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Sort Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">

                <button
                    onClick={() => setSortType("recent")}
                    className={`px-4 py-2 rounded-full transition ${sortType === "recent"
                        ? "bg-black text-white"
                        : "bg-white border"
                        }`}
                >
                    Recently Joined
                </button>

                <button
                    onClick={() => setSortType("name")}
                    className={`px-4 py-2 rounded-full transition ${sortType === "name"
                        ? "bg-black text-white"
                        : "bg-white border"
                        }`}
                >
                    Sort By Name
                </button>

                <button
                    onClick={() => setSortType("cart")}
                    className={`px-4 py-2 rounded-full transition ${sortType === "cart"
                        ? "bg-black text-white"
                        : "bg-white border"
                        }`}
                >
                    Cart Size
                </button>

            </div>

            {/* Users */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                {filteredUsers.map((user) => (

                    <div
                        key={user._id}
                        className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition"
                    >

                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="text-xl font-bold">
                                    {user.fname}
                                </h2>

                                <p className="text-gray-600 text-sm">
                                    {user.email}
                                </p>

                                <p className="text-gray-600 text-sm">
                                    {user.mobile}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${user.role === "admin"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-blue-100 text-blue-600"
                                    }`}
                            >
                                {user.role?.toUpperCase()}
                            </span>

                        </div>

                        <hr className="my-4" />

                        <div className="space-y-2 text-sm">

                            <p>
                                <strong>Address:</strong>{" "}
                                {user.address || "N/A"}
                            </p>

                            <p>
                                <strong>Pincode:</strong>{" "}
                                {user.pincode || "N/A"}
                            </p>

                            <p>
                                <strong>Cart Items:</strong>{" "}
                                {user.carts?.length || 0}
                            </p>

                            <p>
                                <strong>Joined:</strong>{" "}
                                {user.createdAt
                                    ? new Date(
                                        user.createdAt
                                    ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                        </div>

                        {user.carts?.length > 0 && (
                            <div className="mt-4 bg-gray-50 rounded-lg p-3">
                                <h4 className="font-semibold mb-2">
                                    Cart Summary
                                </h4>

                                {user.carts
                                    .slice(0, 3)
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="text-sm text-gray-600"
                                        >
                                            Qty: {item.quantity}
                                        </div>
                                    ))}
                            </div>
                        )}

                        {user.role !== "admin" && (
                            <button
                                onClick={() =>
                                    deleteUser(user._id)
                                }
                                className="w-full mt-5 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Delete User
                            </button>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;