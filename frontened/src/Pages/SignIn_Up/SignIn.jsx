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

    const { account, setAccount } = useContext(LoginContext);

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

        const { email, password } = userdata;
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                withCredentials: true

            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.log("invalid details");
            toast.warn(data.error, {
                position: "top-center",
            })
        }
        else {
            setuserdata(data);
            setAccount(data);
            setTimeout(() => {
                toast.success("User valid", {
                    position: "top-center",
                })
            }, 1500);

            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("email", userdata.email)
            window.localStorage.setItem("loggedIn", true);
            setuserdata({ ...userdata, email: "", password: "" });
            //   window.location.reload(false);

            window.location.href = "./";
        }
    }
    return <>
        <div className='text-center pt-25 w-full h-[80vh] font-bold bg-cover'>
            <div className='inline-block mb-[15px] border border-block p-[30px] rounded-[15px]
            shadow-[3px_3px_3px] bg-[rgba(212,187,156,0.3)] '>
                <form >
                    <h1 className="font-[30px] mb-15px">Sign-In</h1>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor='email'>Email: &nbsp; </label>
                        <input type="text"
                            onChange={adddata}
                            value={userdata.email}
                            name="email" id="email" />
                    </div>
                    <div className='mb-3.75 flex justify-between text-[20px] font-bold'>
                        <label htmlFor="password">Password: &nbsp;</label>
                        <input type="password"
                            onChange={adddata}
                            value={userdata.password}
                            name="password" placeholder='At least 6 char' id="password" />
                    </div>
                    <button className='w-[90px] h-[30px] box-shadow-[2px_2px_2px_rgb(75,74,74)] mt-[9px] rounded-[5px]
                     cursor-pointer font-bold bg-[rgb(123,227,58)] hover:box-shadow-[3px_3px_4px_rgb(75,74,74)]'
                        onClick={handleSubmit}
                    >Sign In</button>
                </form>
                <ToastContainer />
            </div>
            <div>
                <p>new To ItSuitsUhh</p>
                <NavLink to="/signup">
                    <button className="p-[6px] cursor-pointer rounded-[6px] bg-[rgb(93, 93, 239)]  box-shadow: 2px 2px 2px rgb(75, 74, 74) hover-  box-shadow: 3px 3px 4px rgb(75, 74, 74); ">Create new account</button></NavLink>
            </div>
        </div>
    </>
}
export default SignIn;