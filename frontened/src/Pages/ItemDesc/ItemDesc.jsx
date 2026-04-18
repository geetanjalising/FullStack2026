import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from "react-router-dom"
import { BASE_URL } from "../../helper.js";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setCheckoutItems } from "../Redux/checkoutSlice";
import { useNavigate } from "react-router-dom";

const ItemDesc = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [itemDesc, setitemDesc] = useState("");
    const { id } = useParams("");
    const getdata = async () => {
        const res = await fetch(`${BASE_URL}/products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                withCredentials: true
            }
        });
        const data = await res.json();
        if (res.status !== 201) {
            console.log("no data available");
        } else {
            setitemDesc(data);
        }
    }

    useEffect(() => {
        setTimeout(getdata, 15)
    }, [id]);

    const addToCart = async (id) => {
        console.log("Adding to cart:", id);
        const res = await fetch(`${BASE_URL}/cart/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        const data = await res.json();
        if (!res.ok) {
            alert(data.error || "Failed to add to cart");
            return;
        }
        toast.success("Item added to cart ", { position: "top-center" });

    };



    return (
        <div className="min-h-screen bg-gray-100 pt-24 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Product Image */}
                    <div className="flex justify-center">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                            <img
                                src={itemDesc.image}
                                alt={itemDesc.title}
                                className="w-full max-w-sm object-contain mx-auto hover:scale-105 transition duration-300"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-5">

                        <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                            {itemDesc.title}
                        </h1>

                        <p className="text-gray-600 leading-relaxed">
                            <span className="font-semibold text-gray-800">
                                About the item:
                            </span>{" "}
                            {itemDesc.description}
                        </p>

                        <p className="text-2xl font-semibold text-gray-600">
                            ${itemDesc.price}
                        </p>
                        <button
                            onClick={() => addToCart(itemDesc.id)}
                            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition px-8 py-3 rounded-xl font-semibold shadow-md"
                        >
                            Add to Cart
                        </button>


                        <button
                            onClick={() => {
                                const item = {
                                    id: itemDesc.id,
                                    title: itemDesc.title,
                                    price: itemDesc.price,
                                    image: itemDesc.image,
                                    quantity: 1
                                };

                                dispatch(setCheckoutItems([item])); // 👈 single item
                                navigate("/checkout");
                            }}
                            className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition px-8 py-3 rounded-xl font-semibold shadow-md"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};
export default ItemDesc;