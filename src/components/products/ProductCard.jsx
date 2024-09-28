import React, { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Checked from "./Checked";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getFromLS } from "../../utils/localStorage";
import { usrImg } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItem } from "../../context/cart";

const ProductCard = ({ card, quantityHandler }) => {
    const navigate = useNavigate();
    let dataFromLS = getFromLS("cart") || [];

    const cartItems = useSelector((state) => state.cart.cartItems);

    const calculateDiscountedPrice = (priceStr, discountPercentageStr) => {
        const price = parseFloat(priceStr);
        const discountPercentage = parseFloat(discountPercentageStr);

        if (!discountPercentageStr) {
            return price;
        }

        if (isNaN(price) || isNaN(discountPercentage) || price <= 0) {
            return 0;
        }

        const discountAmount = (price * discountPercentage) / 100;
        const discountedPrice = price - discountAmount;

        return discountedPrice;
    };

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeItem(productId));
    };

    return (
        <Card className="overflow-hidden p-0 rounded-lg">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none  aspect-[5/3]"
            >
                <Checked cardId={card?.uuid} />
                <img
                    className="w-full h-full object-cover"
                    src={usrImg + card?.cover_image}
                    alt=""
                />
            </CardHeader>
            <CardBody className="sm:p-3 p-2  pb-0">
                <div
                    onClick={() => navigate(`/mahsulot-haqida/${card?.uuid}`)}
                    className="text-black hover:text-blue-500 transition-all text-sm sm:text-lg font-semibold sm:font-bold cursor-pointer"
                >
                    {card?.name}
                </div>
                <div>
                    <p className="text-gray-400 text-xs sm:text-sm block ">
                        Price:
                        <span className="text-sm  font-semibold ml-3 line-through">
                            {card?.price === null
                                ? "Kelishuv asosida"
                                : (+card?.price).brm()}
                            $
                        </span>
                    </p>
                    <p className="text-black text-xs sm:text-sm block">
                        <span className="text-gray-400">Quantity in stock: </span>
                        {card?.stock_quantity?.brm()}
                    </p>
                    <p className="text-black text-xs sm:text-sm block">
                        <span className="text-gray-400 pr-2 ">At discount:</span>
                        <span className="text-lg text-blue-500 ">
                            {calculateDiscountedPrice(
                                card?.price,
                                card?.discount_price
                            ).toFixed(2)}
                            $
                        </span>
                    </p>
                </div>
            </CardBody>
            <CardFooter className="sm:p-3 p-2 pt-0  mt-auto">
                {cartItems && cartItems.find((i) => i?.uuid === card?.uuid) ? (
                    <button
                        onClick={() => handleRemoveItem(card.uuid)}
                        id="cart"
                        className={`bg w-full flex-row mt-3 gap-2 flex items-center justify-center  text-white rounded-md p-1 sm:py-2 flex-1`}
                    >
                        <HiOutlineShoppingCart
                            className={"w-4 sm:w-6 h-4 hidden sm:block sm:h-6"}
                        />
                        <span className="text-sm sm:text-base ">
                            Bekor qilish
                        </span>
                    </button>
                ) : (
                    <button
                        onClick={() => handleAddToCart(card)}
                        id="cart"
                        className={`bg w-full flex-row mt-3 gap-2 flex items-center justify-center  text-white rounded-md p-1 sm:py-2 flex-1`}
                    >
                        <HiOutlineShoppingCart
                            className={"w-4 sm:w-6 h-4 hidden sm:block sm:h-6"}
                        />
                        <span className="text-sm sm:text-base ">
                            Purchase
                        </span>
                    </button>
                )}
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
