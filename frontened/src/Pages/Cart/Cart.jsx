import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../../helper.js";
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [cartdata, setCartdata] = useState([]);
    const getCartItems = async () => {
        const res = await fetch(`${BASE_URL}/cart/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        const data = await res.json();
        setCartdata(data);
        console.log("Cart data fetched:", data);
    }

    useEffect(() => {
        getCartItems();
    }, []);

    const removeCartItem = (id) => async () => {
        console.log("Removing item from cart:", id);
        const res = await fetch(`${BASE_URL}/cart/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (res.status === 200) {
            console.log("Item removed from cart:", id);
            getCartItems();
            dispatch(removeItem(id));
        } else {
            console.error("Failed to remove item from cart:", id);
        }
    }

    const incQty = (productId) => async () => {

        setCartdata(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        dispatch(increaseQty(productId));
        await fetch(`${BASE_URL}/cart/increaseQty/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    };

    const decQty = (productId) => async () => {
        setCartdata(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
        dispatch(decreaseQty(productId));
        await fetch(`${BASE_URL}/cart/decreaseQty/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    };

    return (
        <>
            <div className='w-full min-height-[100vh] t-60px pt-50px bg-[#EAEDED!important'>
                <div className='m-0_auto p-[40px_20px] flex mb-[100px]'>
                    {/* media query */}
                    <div className='flex-[0.7] bg-amber-50 p-[10px_20px] rounded-[2px]'>
                        <h1 className='font-[500] text-28px'>Shopping Cart</h1>

                        {
                            cartdata.map((e, k) => {   //travsersing cart data
                                return (
                                    <>
                                        <div className='p-[10px_5px_20px_15px] grid  grid-template-columns:.8fr 2fr .1fr}' key={k}>
                                            <img src={e.image} alt="imgitem" />
                                            <div >
                                                <h3>{e.title}</h3>
                                                <h3>{e.description}</h3>
                                                <h3>₹{e.price * e.quantity}.00</h3>

                                                <button type="button" onClick={incQty(e.id)}>+</button>
                                                Quantity: {e.quantity}
                                                <button type="button" onClick={decQty(e.id)}>-</button>

                                                <button type="button" onClick={removeCartItem(e.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;