import React from 'react'
import { create } from 'zustand'
import { OrderedForm } from './OrderedForm'


export const allPrice = create((set) => ({
    price: 0,
    kelishuv: 0,
    updatePrice: (newPrice) => set(() => ({ price: newPrice })),
    updateKelishuv: (newKelishuv) => set(() => ({ kelishuv: newKelishuv })),
}))
const TotalPrice = ({ cartLength }) => {
    const { price, kelishuv } = allPrice()
    return (
        <div>
            <h1 className='font-semibold mb-4'>Buyurtmangiz</h1>
            <div className='flex flex-col gap-2'>
                <div className='flex text-sm justify-between'>
                    <div>Maxsulotlar({cartLength - kelishuv}):</div>
                    <div className='text-blue-500 text-xl'>{price.brm()} so'm</div>
                </div>
                <div className='flex text-sm justify-between'>
                    <div>Kelishilgan maxsulotlar:</div>
                    <div className='text-blue-500'>{kelishuv} ta</div>
                </div>
                <div className='flex text-sm justify-between'>
                    <div>Umumiy maxsulotlar:</div>
                    <div className='text-blue-500'>{cartLength} ta</div>
                </div></div>
            <div className='mt-10'>
                <h1 className='font-semibold text-sm mb-4'>Buyurtmani rasmiylashtirish</h1>
                <OrderedForm />
            </div>
        </div>
    )
}

export default TotalPrice