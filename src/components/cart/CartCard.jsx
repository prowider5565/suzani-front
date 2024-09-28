import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { usrImg } from "../../api/axios";

const CartCard = ({ quantityHandler, toggleHandler, card }) => {
    return (
        <div className="border-b relative overflow-hidden py-2 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start gap-5  ">
                <div className="w-32 aspect-square rounded-md overflow-hidden  h-auto relative">
                    <img
                        src={usrImg + card?.cover_image}
                        className="w-full h-full object-cover object-center"
                        alt=""
                    />
                </div>
                <div className="flex-1 flex w-full flex-col">
                    <h1 className="text-slate-900 text-lg font-bold">
                        {card?.name}
                    </h1>
                    <p className="text-black text-xs sm:text-sm block">
                        <span className="text-gray-400">Quantity in stock:</span>{" "}
                        {card?.quantity}
                    </p>
                    <div className="mt-2 sm:flex gap-5 flex-1">
                        <div className="flex sm:block gap-2 justify-between  items-center">
                            <p className="text-black sm:mb-2 text-xs font-light">
                                Narx
                            </p>
                            <p className="text-red-500 text-md font-semibold ">
                                {card?.price === null
                                    ? "Kelishuv asosida"
                                    : (+card?.price).brm() + " $"}
                                <span className="text-black"></span>
                            </p>
                        </div>
                        <div className="flex sm:block gap-2 justify-between  items-center">
                            <p className="text-black sm:mb-2 text-xs text-center font-light">
                                Soni
                            </p>
                            <div className="border flex justify-between rounded-md w-28 px-1 cursor-pointer">
                                <button
                                    onClick={() => quantityHandler(false, card)}
                                    className="text-red-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 12h-15"
                                        />
                                    </svg>
                                </button>
                                <div>{card.count}</div>
                                <button
                                    onClick={() => quantityHandler(true, card)}
                                    className="text-blue-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex sm:block gap-2 justify-between  items-center">
                            <p className="text-black sm:mb-2 text-xs font-light">
                                Umumiy summa
                            </p>
                            <p className="text-blue-500 text-md font-semibold ">
                                {card?.price === null
                                    ? "Kelishuv asosida"
                                    : (card?.price * card.count).brm() + " $"}
                                <span className="text-black"></span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end items-end mt-2">
                        <div className="flex gap-3">
                            <button
                                onClick={() => toggleHandler(card)}
                                className="bg-transparent text-blue-500 border border-blue-500 flex items-center text-[12px] font-normal p-1  rounded"
                            >
                                <span>Remove</span>
                                <IoTrashOutline className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
