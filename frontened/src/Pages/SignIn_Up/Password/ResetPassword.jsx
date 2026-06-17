import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../helper";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error);
            } else {
                toast.success("Password updated successfully");

                setTimeout(() => {
                    navigate("/signin");
                }, 1500);
            }

        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="password"
                        placeholder="New Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg"
                    />

                    <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                        Reset Password
                    </button>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ResetPassword;