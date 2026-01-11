import logo from '../../assets/images/logo.png'
import { FcSearch } from "react-icons/fc"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { LoginContext } from '../Context/ContextProvider';
import { BASE_URL } from '../../helper.js';
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Redux/productSlice";

const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const [searchtext, setText] = useState("");
    const [searchliopen, setliopen] = useState(true);
    const getText = (items) => {
        setText(items);
        setliopen(false);
    }

    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`${BASE_URL}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // withCredentials: false
                },
            });
            const data = await res.json();
            dispatch(setProducts(data));
        };

        fetchProducts();
    }, [dispatch]);


    const getdetailvaliduser = async () => {
        const res = await fetch(`${BASE_URL}/users/validUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                // withCredentials: false
            },
        });
        const data = await res.json();

        if (res.status !== 200) {
            console.log("error");
        } else {
            setAccount(data.user);
        }
    };

    useEffect(() => {
        getdetailvaliduser()
    }, []);

    const logoutuser = () => {
        window.localStorage.clear();
        window.location.href = "./";
    }
    return <>
        <div className='flex align-center justify-between fixed h-[50px] w-full z-5 bg-[linear-gradient(rgb(33,27,27,0.9),rgb(233,233,227,0.0))]'>
            {/* leftnav */}
            <div className='flex items-center [&_img]:w-20 [&_img]:h-20'>
                <NavLink to="/" style={{ textDecoration: 'none' }}><img src={logo} /></NavLink>
            </div>

            {/* middlenav */}
            <div className='middlenav'>
                <div className='search'>
                    <input type='search' placeholder='Search' onChange={(e) => getText(e.target.value)} />
                    <div className='search_icon'><FcSearch /></div>
                    {
                        searchtext &&
                        <List className='extrasearch' hidden={searchliopen}>
                            {
                                products.filter(product => product.title.toLowerCase()
                                    .includes(searchtext.toLowerCase())).map(product => (
                                        <ListItem>
                                            <NavLink to={`/products/${product.id}`} onClick={() => setliopen(true)}>
                                                {product.title}
                                            </NavLink>
                                        </ListItem>
                                    ))
                            }
                        </List>
                    }
                </div>
            </div>

            {/* rightnav */}
            <div className='rightnav'>
                <div className='right1'>
                    {
                        !account ?
                            <NavLink to="/signin">SignIn</NavLink>
                            : ""
                    }
                    <NavLink to="/cart">
                        {
                            account ?
                                <Badge color='primary' badgeContent={account.carts.length}>
                                    <ShoppingCartIcon />
                                </Badge>
                                : <Badge color='primary' badgeContent={0}>
                                    <ShoppingCartIcon />
                                </Badge>
                        }
                    </NavLink>

                    {
                        account ?
                            <NavLink to="/profile"><p>💁‍♂️ {account.fname.split(" ")[0].toUpperCase()}
                            </p></NavLink> : ""
                    }

                    {
                        account ? <div onClick={logoutuser}>Logout</div> : ""
                    }
                </div>
                <div className='right2'>
                    <p>🍔</p>
                </div>
            </div>
        </div >



    </>
}
export default Navbar;