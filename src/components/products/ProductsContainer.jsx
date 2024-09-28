import React from "react";
import ProductCard from "./ProductCard";
import { useStore } from "../navbar/Navbar";
import { toggleFn } from "../../utils/toggleFn";
import { GoSearch } from "react-icons/go";

const ProductsContainer = ({ data }) => {
    const items = Array.isArray(data) ? data : data?.results || [];

    const { cart, updateCart } = useStore();
    const quantityHandler = (card) => {
        toggleFn("cart", card, updateCart);
    };

    return (
        <div
            className={`mt-10 grid grid-cols-1 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:p-0 gap-3 sm:gap-5 md:gap-7`}
        >
            {items.length ? (
                items.map((card, index) => (
                    <ProductCard
                        quantityHandler={quantityHandler}
                        card={card}
                        key={index}
                    />
                ))
            ) : (
                <div className="min-h-[300px] col-span-full flex flex-col items-center gap-4 ps-10">
                    <div>
                        <GoSearch className="w-20 h-20 text-blue-500" />
                    </div>
                    <h1 className="text-lg font-medium">
                        Sorry, product you are searching not found!                    </h1>
                    <p className="text-sm">
                    There may be an error in the product name or we may not have the product yet
                    </p>
                    </div>
            )}
        </div>
    );
};

export default ProductsContainer;
