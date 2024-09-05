import React, { useState, useEffect, useRef } from "react";
import { create } from "zustand";
import { OrderedForm } from "./OrderedForm";
import PaymentForm from "./PaymentForm";

export const allPrice = create((set) => ({
  price: 0,
  kelishuv: 0,
  updatePrice: (newPrice) => set(() => ({ price: newPrice })),
  updateKelishuv: (newKelishuv) => set(() => ({ kelishuv: newKelishuv })),
}));

const TotalPrice = ({ cartLength }) => {
  const { price, kelishuv } = allPrice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div>
      <h1 className="font-semibold mb-4">Your order</h1>
      <div className="flex flex-col gap-2">
        <div className="flex text-sm justify-between">
          <div>Products ({cartLength - kelishuv}):</div>
          <div className="text-blue-500 text-xl">{price.brm()} soum</div>
        </div>
        <div className="flex text-sm justify-between">
          <div>Agreed products :</div>
          <div className="text-blue-500">{kelishuv} pieces</div>
        </div>
        <div className="flex text-sm justify-between">
          <div>General products :</div>
          <div className="text-blue-500">{cartLength} pieces</div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="font-semibold text-sm mb-4">Order processing</h1>

        {/* PaymentForm ga prop sifatida price ni uzatamiz */}
        <PaymentForm saleAmount={price} />

        <button
          onClick={openModal}
          className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Order confirmation
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transform transition-transform duration-300 ease-in-out scale-100"
          >
            <h2 className="text-lg font-semibold mb-4">Sign up</h2>
            <OrderedForm />
            <div className="flex justify-end mt-4">
              {/* <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Yopish
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalPrice;