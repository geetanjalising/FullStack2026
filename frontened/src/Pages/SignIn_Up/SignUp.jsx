import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../helper.js";
import { ToastContainer, toast } from 'react-toastify';

const SignUp = () => {
    const [userdata, setuserdata] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
        address: "",
        pincode: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setuserdata(() => {
            return {
                ...userdata,
                [name]: value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword, address, pincode } = userdata;

        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                withCredentials: true
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword, address, pincode
            })
        });

        const data = await res.json();
        if (res.status === 422) {
            toast.warn(data.error, {
                position: "top-center",
            })
        }
        else {
            // alert("data successfully added")
            toast.success("Successfully Registered!", {
                position: "top-center",
            })
            setuserdata({ ...adddata, fname: "", email: "", mobile: "", password: "", cpassword: "", address: "", pincode: "" });

            setTimeout(() => {
                window.location.href = "./signin";
            }, 1500);

        }
    };

    return (
        <div className='text-center pt-25 w-full h-[80vh] font-bold bg-cover'>

            <div className='inline-block mb-[15px] border border-block p-[30px] rounded-[15px]
            shadow-[3px_3px_3px] bg-[rgba(212,187,156,0.3)]'>
                <form >
                    <h1 className="font-[30px] mb-15px">Create Account</h1>

                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='fname'>Your Name: &nbsp;</label>
                        <input type="text"
                            onChange={adddata}
                            value={userdata.fname}
                            name="fname" id="fname" />
                    </div>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='email'>Email:&nbsp;</label>
                        <input type="text"
                            onChange={adddata}
                            value={userdata.email}
                            name="email" id="email" />
                    </div>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='number'>Mobile:&nbsp;</label>
                        <input type="text"
                            onChange={adddata}
                            value={userdata.mobile}
                            name="mobile" id="mobile" />
                    </div>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='address'>Address:&nbsp;</label>
                        <input type="text"
                            onChange={adddata}
                            value={userdata.address}
                            name="address" id="address" />
                    </div>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='pincode'>Pin Code:&nbsp;</label>
                        <input type="number"
                            onChange={adddata}
                            value={userdata.pincode}
                            name="pincode" id="pincode" />
                    </div>

                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor="password">Password:&nbsp;</label>
                        <input type="password"
                            onChange={adddata}
                            value={userdata.password}
                            name="password" placeholder='At least 6 char' id="password" />
                    </div>

                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor="cpassword">Confirm Password:&nbsp;</label>
                        <input type="password"
                            onChange={adddata}
                            value={userdata.cpassword}
                            name="cpassword" id="cpassword" />
                    </div>
                    <button className='w-[90px] h-[30px] shadow-[2px_2px_2px_rgb(75,74,74)] mt-[9px] rounded-[5px]
                     cursor-pointer font-bold bg-[rgb(123,227,58)] hover:shadow-[3px_3px_4px_rgb(75,74,74)]'
                        onClick={handleSubmit}
                    >Register</button>
                    <div className="p-[6px] cursor-pointer rounded-[6px] bg-[rgb(93,93,239)] shadow-[2px_2px_2px_rgb(75,74,74)] hover:shadow-[3px_3px_4px_rgb(75,74,74)]">
                        <p>Already have an account?<NavLink to="/signin" style={{ textDecoration: "none" }}>Signin</NavLink></p>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}
export default SignUp;