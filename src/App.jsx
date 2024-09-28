import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { create } from "zustand";
import { getFromLS } from "./utils/localStorage";
import Cart from "./components/cart/Cart";
import Navbar from "./components/navbar/Navbar";
import Detail from "./pages/detail/Detail";
import Footer from "./components/footer/Footer";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import AboutOur from "./pages/aboutOur/AboutOur";
import Contact from "./pages/contact/Contact";

// update cart every render

const App = () => {
    // const { cart, updateCart } = useStore()

    return (
        <div>
            {/* toats components */}
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/savatcha" element={<Cart />} />
                <Route path="/mahsulot-haqida/:cardId" element={<Detail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/biz-haqimizda" element={<AboutOur />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
