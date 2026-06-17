import { useState } from "react";
import { BASE_URL } from "../../../helper";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error);
            } else {
                toast.success("If this email exists, a reset link was sent");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Forgot Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded-lg"
                    />

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                        Send Reset Link
                    </button>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPassword;