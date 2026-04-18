import logo from '../../assets/images/logo.png'
import { FcSearch } from "react-icons/fc"
import { HiMenu, HiX } from "react-icons/hi"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { LoginContext } from '../Context/ContextProvider'
import { BASE_URL } from '../../helper.js'
import { useDispatch, useSelector } from "react-redux"
import { setProducts } from "../Redux/productSlice"

const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext)
    const [searchtext, setText] = useState("")
    const [searchliopen, setliopen] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)

    const getText = (val) => {
        setText(val)
        setliopen(false)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${BASE_URL}/products`);
            const data = await res.json();
            dispatch(setProducts(data));
        }
        fetchProducts()
    }, [dispatch])

    const getdetailvaliduser = async () => {
        const res = await fetch(`${BASE_URL}/users/validUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        const data = await res.json()
        if (res.status === 200) setAccount(data.user)
    }

    useEffect(() => {
        getdetailvaliduser()
    }, [])

    const logoutuser = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <>
            {/* NAVBAR */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

                    {/* Logo */}
                    <NavLink to="/" className="flex items-center">
                        <img src={logo} className="h-10 w-auto" alt="logo" />
                    </NavLink>

                    {/* Search (desktop) */}
                    <div className="hidden md:flex relative w-[35%]">

                        {/* Input */}
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="w-full border rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={(e) => getText(e.target.value)}
                        />

                        {/* Icon */}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <FcSearch size={18} />
                        </div>

                        {/* Dropdown */}
                        {searchtext && (
                            <div className="absolute top-full mt-2 w-full bg-white shadow-xl rounded-xl border z-50 max-h-60 overflow-y-auto">

                                {products.filter(p =>
                                    p.title.toLowerCase().includes(searchtext.toLowerCase())
                                ).length > 0 ? (

                                    products
                                        .filter(p =>
                                            p.title.toLowerCase().includes(searchtext.toLowerCase())
                                        )
                                        .map(p => (
                                            <NavLink
                                                key={p.id}
                                                to={`/products/${p.id}`}
                                                onClick={() => setliopen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                                            >
                                                {p.title}
                                            </NavLink>
                                        ))

                                ) : (
                                    <p className="px-4 py-3 text-gray-500 text-sm">
                                        No products found
                                    </p>
                                )}

                            </div>
                        )}
                    </div>

                    {/* Right (desktop) */}
                    <div className="hidden md:flex items-center gap-6">
                        {!account && <NavLink to="/signin">Sign In</NavLink>}

                        <NavLink to="/cart">
                            <Badge badgeContent={account?.carts?.length || 0} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </NavLink>

                        {account && (
                            <>
                                <NavLink to="/profile" className="font-medium">
                                    👤 {account.fname.split(" ")[0]}
                                </NavLink>
                                <button
                                    onClick={logoutuser}
                                    className="text-red-500 hover:underline"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Hamburger (mobile) */}
                    <button
                        className="md:hidden"
                        onClick={() => setOpenMenu(true)}
                    >
                        <HiMenu size={26} />
                    </button>
                </div>
            </header>

            {/* MOBILE SIDEBAR */}
            {openMenu && (
                <div className="fixed inset-0 z-50 bg-black/40">
                    <div className="fixed right-0 top-0 h-full w-64 bg-white p-4 shadow-lg">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <HiX size={24} onClick={() => setOpenMenu(false)} />
                        </div>

                        {!account && (
                            <NavLink to="/signin" onClick={() => setOpenMenu(false)}>
                                Sign In
                            </NavLink>
                        )}

                        <NavLink to="/cart" className="block mt-4">
                            Cart ({account?.carts?.length || 0})
                        </NavLink>

                        {account && (
                            <>
                                <NavLink to="/profile" className="block mt-4">
                                    👤 {account.fname}
                                </NavLink>

                                <button
                                    onClick={logoutuser}
                                    className="block mt-4 text-red-500"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Spacer */}
            <div className="h-14"></div>
        </>
    )
}

export default Navbar
