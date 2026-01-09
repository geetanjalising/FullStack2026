import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../helper.js";

const ItemDesc = () => {
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
        console.log("Add to cart response:", data);

        if (!res.ok) {
            alert(data.error || "Failed to add to cart");
            return;
        }
    };

    return (
        <>
            <div className='relative top-[60px] w-full h-[100vh]'>
                {/* {itemDesc && Object.keys(itemDesc).length && */}
                <div className='w-[95%] m-[0_auto] flex p-[50px_20px]'>
                    <div className='flex direction-coloumn align-center justify-center'>
                        <img className='w-[60%] mb-[30px] shadow-[4px_4px_9px_0px]'
                            src={itemDesc.image}
                            alt="cart_img" />
                    </div>

                    <div className='flex-[0.5] p-[20px] rounded-[4px]'>
                        <h3 className='text-bold text-[23px] mb-[5px]'>{itemDesc.title}</h3>
                        <p className="mrp">M.R.P. : ₹{itemDesc.price}</p>

                        <p className="description">About the Iteam : <span style={{ color: "#565959", fontSize: "14px", fontWeight: "500", letterSpacing: "0.4px" }}>{itemDesc.description}</span></p>
                        <button className='cart_btn1' onClick={() => addToCart(itemDesc.id)}>Add to Cart</button>
                        {/* <div className='cart_btn0'>
                            {
                                account ? 
                                <> <button className='cart_btn1' onClick={() => addtocart(idxdata.id)}>Add to Cart</button>
                                    <NavLink to="/payment"><button className='cart_btn1'>Buy Now</button></NavLink>
                                </> :
                                    <>  <NavLink to="/noaccount"><button className='cart_btn1' >Add to Cart</button></NavLink>
                                        <NavLink to="/payment"><button className='cart_btn1'>Buy Now</button></NavLink></>
                            }


                        </div> */}
                    </div>
                </div>
                {/* }
                {!idxdata ? <div className='circle'>
                    <CircularProgress />
                    <h2>Loading...</h2>
                </div> : ""} */}
            </div>
        </>
    )
}
export default ItemDesc;