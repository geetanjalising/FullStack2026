import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../helper.js";
import { ToastContainer, toast } from 'react-toastify';
import { LoginContext } from '../Context/ContextProvider';

const SignIn = () => {
    const [userdata, setuserdata] = useState({
        email: "",
        password: ""
    });

    const { setAccount } = useContext(LoginContext);

    const adddata = (e) => {
        const { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = userdata;
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.status === 400 || !data) {
            toast.warn(data.error, { position: "top-center" });
        } else {
            setAccount(data);
            toast.success("Login successful", { position: "top-center" });

            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedIn", true);

            setTimeout(() => {
                window.location.href = "/";
            }, 1200);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    Sign In
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={userdata.email}
                            onChange={adddata}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={userdata.password}
                            onChange={adddata}
                            placeholder="At least 6 characters"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Sign In
                    </button>
                </form>

                <ToastContainer />

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-500">New to ItSuitsUhh?</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Create account */}
                <NavLink to="/signup">
                    <button className="w-full border border-gray-400 py-2 rounded-lg hover:bg-gray-100 transition">
                        Create new account
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default SignIn;
