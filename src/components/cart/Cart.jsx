// src/components/Cart.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../../context/cart";
import ProductCard from "../products/ProductCard";
import CartOrder from "./CartOrder";
import { OrderedForm } from "./OrderedForm";

const Cart = () => {
    const cart = useSelector((state) => state.cart.cartItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotal());
    }, [cart, dispatch]);

    return (
        <div className="xl:container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Savat</h1>
            {cart.length === 0 ? (
                <div className="w-full min-h-[460px] flex items-center justify-center font-semibold text-xl">
                    Savat bo'sh
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex justify-between gap-10">
                        <div className="flex flex-1 flex-col gap-4">
                            {cart.map((item) => (
                                <CartOrder item={item} key={item?.uuid} />
                            ))}
                        </div>
                        <div className="border w-[420px] h-[620px] sticky top-44 xl:top-28 rounded-lg p-4">
                            <div className="mb-4">
                                <p className="text-lg font-medium">
                                    Sizning buyurtmangiz
                                </p>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm">
                                        Maxsulotlar: ({cart?.length})
                                    </p>
                                    <p className="text-blue-500">
                                        {totalPrice?.brm()}$
                                    </p>
                                </div>
                            </div>

                            <p className="font-semibold text-lg mb-3">
                                Buyurtma formasi
                            </p>

                            <OrderedForm />
                        </div>
                    </div>
                    {/* <div className="text-right text-xl font-semibold">
                        Jami: ${totalPrice.toFixed(2)}
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default Cart;
