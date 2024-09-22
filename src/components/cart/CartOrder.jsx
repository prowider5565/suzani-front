// src/components/CartCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, removeItem } from "../../context/cart";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { usrImg } from "../../api/axios";

const CartOrder = ({ item }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(addToCart(item));
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(removeFromCart(item.uuid));
        }
    };

    const handleRemove = () => {
        dispatch(removeItem(item.uuid));
    };

    return (
        <div className="flex flex-col xl:items-center justify-between gap-4 shadow-md border xl:p-6 rounded-xl xl:flex-row">
            <div className="flex flex-col xl:items-center xl:flex-row gap-6">
                <img
                    src={usrImg + item?.cover_image}
                    alt=""
                    className="object-cover h-[240px] xl:h-[160px] w-full xl:w-[200px] "
                />
                <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                        $ {item.price} x {item.quantity} = $
                        {(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="p-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 border border-gray-400 px-2 rounded-md">
                    <button
                        onClick={handleDecrease}
                        className={`text-xl px-1 py-1.5 rounded-sm transition ${item.quantity === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                        disabled={item.quantity === 1}
                    >
                        <FiMinus />
                    </button>
                    <span className="text-lg border-l border-r border-gray-500 py-1.5 px-4">
                        {item.quantity}
                    </span>
                    <button
                        onClick={handleIncrease}
                        className={`text-xl px-1 py-1.5 rounded-sm transition ${item.quantity === 10
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <FiPlus />
                    </button>
                </div>
                <button
                    onClick={handleRemove}
                    className="border flex items-center gap-2 px-2 py-2 rounded-md bg-red-400 text-white text-sm hover:bg-red-500 duration-150"
                >
                    <FiTrash2 />
                    <p>O'chirish</p>
                </button>
            </div>
        </div>
    );
};

export default CartOrder;
