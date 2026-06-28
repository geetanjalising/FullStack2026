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
import AllUsers from './Pages/Profile/AllUsersProfile.jsx'
import ForgotPassword from './Pages/SignIn_Up/Password/ForgotPassword.jsx'
import ResetPassword from './Pages/SignIn_Up/Password/ResetPassword.jsx'
import AddProduct from './Pages/Products/Addproduct.jsx'
import ManageProducts from './Pages/Products/ManageProducts.jsx'
import EditProduct from './Pages/Products/Editproduct.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:id" element={<ItemDesc />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
