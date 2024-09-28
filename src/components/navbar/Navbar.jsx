import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import SelectMaterial from "../select/SelectMaterial";
import { FiSearch } from "react-icons/fi";
import { create } from "zustand";
import { getFromLS } from "../../utils/localStorage";
import { getAllProducts } from "../../hooks/productsHook";
import { useSelector } from "react-redux";

export const useStore = create((set) => ({
    cart: [],
    updateCart: (newCart) => set(() => ({ cart: newCart })),
}));

const Navbar = () => {
    const { cart, updateCart } = useStore();

    const totalProduct = useSelector((state) => state.cart.cartItems.length);

    const [dataInp, setDataInp] = useState("");
    const { refetch, isFetching } = getAllProducts({
        type: "search",
        typeFilter: "default",
        value: dataInp,
        setDataInp,
    });
    useEffect(() => {
        let dataFromLS = getFromLS("cart") || [];
        updateCart(dataFromLS);
    }, [isFetching]);

    const clickHandler = () => {
        refetch();
    };
    return (
        <div className="py-3 sticky min-h-[80px] bg-black/5 backdrop-blur-xl flex flex-col items-center z-10 top-[-1px]">
            <div className="main-container w-full flex gap-5  flex-wrap items-center justify-between">
                <Link to={"/"} className="text-2xl font-semibold text-blue-500">
                    <img
                        src="https://api.suzani-abdulhakim.uz/media/logo.png"
                        alt=""
                        className="w-52"
                    />
                </Link>
                <div className="flex flex-wrap items-center w-full  xl:w-[700px] 2xl:w-[900px]  justify-center order-2 gap-3">
                    {/* <div className='w-full md:w-auto'>
                        <SelectMaterial />
                    </div> */}
                    <div className="flex border rounded-xl bg-[#f0f2f4] border-black/10 text-black  flex-1 max-w-[700px]">
                        <input
                            value={dataInp}
                            onChange={(e) => setDataInp(e.target.value)}
                            type="text"
                            className="rounded-e-none border-e-0 w-full py-3 text-[13px] bg-transparent  placeholder:text-gray-500"
                            placeholder="Search for products..."
                        />
                        <button
                            onClick={clickHandler}
                            className="bg  rounded-xl  text-white  w-20 flex items-center justify-center font-bold"
                        >
                            <FiSearch className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="flex gap-6  flex-wrap justify-evenly items-center text-blue-500 order-1 xl:order-2  sm:w-auto">
                    <Link
                        to={"/Cart"}
                        className="flex cursor-pointer py-1 flex-col items-center relative text-[12px]"
                    >
                        <HiOutlineShoppingCart className="w-6 h-6" />
                        <span className="absolute right-0 top-0 bg-blue-500 text-white w-max px-1 min-w-4 h-4 flex items-center  justify-center rounded-full">
                            {totalProduct}
                        </span>
                        <span className="text-black">Your cart</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
