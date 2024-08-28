import React from 'react'
import ChooseCart from '../components/cart/ChooseCart'
import TotalPrice from '../components/cart/TotalPrice'
import { useStore } from '../components/navbar/Navbar'

const Cart = () => {
    const { cart, updateCart } = useStore()
    return (
        <div className='min-h-screen'>
            <div className='main-container gap-5 items-start grid grid-cols-1 xl:grid-cols-5 mt-10'>
                <div className='col-span-1 lg:col-span-3 flex border rounded-md p-3 flex-col gap-8'>
                    <ChooseCart cart={cart} updateCart={updateCart} />
                </div>
                <div className='col-span-1 lg:col-span-2 flex border rounded-md p-3 flex-col gap-8'>
                    <TotalPrice cartLength={cart?.length}/>
                </div>
            </div>
        </div>
    )
}

export default Cart