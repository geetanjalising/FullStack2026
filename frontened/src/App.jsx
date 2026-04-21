import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/Home.jsx'
import Footer from './Pages/Footer/Footer.jsx'
import Navbar from './Pages/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn_Up/SignIn.jsx'
import SignUp from './Pages/SignIn_Up/SignUp.jsx'
import ItemDesc from './Pages/ItemDesc/ItemDesc.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Products from './Pages/Products/Products.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import Checkout from './Pages/Checkout/Checkout.jsx'
import Orders from './Pages/Orders/Orders.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:id" element={<ItemDesc />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id" element={<Orders />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
