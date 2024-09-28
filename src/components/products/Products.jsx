// // src/components/ProductList.jsx
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart, removeItem } from "../../context/cart";

// const products = [
//     { id: 1, name: "Mahsulot 1", price: 15 },
//     { id: 2, name: "Mahsulot 2", price: 30 },
//     { id: 3, name: "Mahsulot 3", price: 25 },
//     { id: 4, name: "Mahsulot 4", price: 20 },
//     { id: 5, name: "Mahsulot 5", price: 50 },
// ];

// const ProductList = () => {
//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart.cartItems);

//     const handleAddToCart = (product) => {
//         dispatch(addToCart(product));
//     };

//     const handleRemoveFromCart = (productId) => {
//         dispatch(removeFromCart(productId));
//     };

//     const handleRemoveItem = (productId) => {
//         dispatch(removeItem(productId));
//     };

//     return (
//         <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => {
//                 const cartItem = cartItems.find(
//                     (item) => item.id === product.id
//                 );
//                 return (
//                     <div
//                         key={product.id}
//                         className="border rounded-lg shadow-lg p-4 flex flex-col justify-between bg-white"
//                     >
//                         <div>
//                             <h2 className="text-xl font-semibold mb-2">
//                                 {product.name}
//                             </h2>
//                             <p className="text-gray-700 mb-4">
//                                 ${product.price}
//                             </p>
//                         </div>
//                         {cartItem ? (
//                             <div className="flex flex-col space-y-2">
//                                 <div className="flex items-center space-x-2">
//                                     <button
//                                         onClick={() =>
//                                             handleRemoveFromCart(product.id)
//                                         }
//                                         className={`bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition ${
//                                             cartItem.quantity === 1
//                                                 ? "opacity-50 cursor-not-allowed"
//                                                 : ""
//                                         }`}
//                                         disabled={cartItem.quantity === 1}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-lg">
//                                         {cartItem.quantity}
//                                     </span>
//                                     <button
//                                         onClick={() => handleAddToCart(product)}
//                                         className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                                 <button
//                                     onClick={() => handleRemoveItem(product.id)}
//                                     className="bg-gray-500 text-white px-3 py-1 rounded-full hover:bg-gray-600 transition"
//                                 >
//                                     Remove
//                                 </button>
//                             </div>
//                         ) : (
//                             <button
//                                 onClick={() => handleAddToCart(product)}
//                                 className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                             >
//                                 Savatga qo'shish
//                             </button>
//                         )}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../hooks/productsHook";
import ProductsContainer from "./ProductsContainer";
import Spinner from "../spinner/Spinner";

const Products = () => {
    const [isReversed, setIsReversed] = useState(false);
    const [typeFilter, setTypeFilter] = useState("default");

    const { refetch, data, isFetching } = getAllProducts({
        typeFilter,
        isReversed,
    });

    useEffect(() => {
        refetch();
    }, []);

    const sortHandler = (type) => {
        if (type === "default") {
            refetch();
        } else {
            setIsReversed(!isReversed);
        }
        setTypeFilter(type);
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-3  justify-between items-center mt-10">
                <div className="text-lg font-semibold">
                    Mahsulotlarni Saralash:
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => sortHandler("default")}
                        className="border rounded p-2"
                    >
                        Odatiy tartib
                    </button>
                    <button
                        onClick={() => sortHandler("price")}
                        className="border rounded p-2"
                    >
                        Narx bo'yicha tartib
                    </button>
                    <button
                        onClick={() => sortHandler("name")}
                        className="border rounded p-2"
                    >
                        Nomi bo'yicha tartib
                    </button>
                </div>
            </div>
            {isFetching && <Spinner />}
            <ProductsContainer data={data} />
        </div>
    );
};

export default Products;
