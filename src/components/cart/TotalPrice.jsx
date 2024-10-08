import React, { useEffect } from "react";
import { create } from "zustand";
import { OrderedForm } from "./OrderedForm";
import { getFromLS } from "../../utils/localStorage";

export const allPrice = create((set) => ({
    price: 0,
    kelishuv: 0,
    updatePrice: (newPrice) => set(() => ({ price: newPrice })),
    updateKelishuv: (newKelishuv) => set(() => ({ kelishuv: newKelishuv })),
}));
const TotalPrice = ({ cartLength }) => {
    const { price, kelishuv } = allPrice();

    let result = getFromLS("cart");

    let totalCount = result.reduce((count, item) => {
        return count + item.count * item.price;
    }, 0);

    return (
        <div>
            <h1 className="font-semibold mb-4">Buyurtmangiz</h1>
            <div className="flex flex-col gap-2">
                <div className="flex text-sm justify-between">
                    <div>Products({cartLength - kelishuv}):</div>
                    <div className="text-blue-500 text-xl">{price.brm()} $</div>
                </div>
                <div className="flex text-sm justify-between">
                    <div>Kelishilgan Products:</div>
                    <div className="text-blue-500">{kelishuv} ta</div>
                </div>
                <div className="flex text-sm justify-between">
                    <div>Umumiy Products:</div>
                    <div className="text-blue-500">{cartLength} ta</div>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-sm mb-4">
                    Buyurtmani rasmiylashtirish
                </h1>
                <OrderedForm />
            </div>
        </div>
    );
};

export default TotalPrice;
