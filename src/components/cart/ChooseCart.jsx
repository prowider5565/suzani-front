import React, { useEffect } from 'react'
import { addToLS, getFromLS } from '../../utils/localStorage'
import { toggleFn } from '../../utils/toggleFn';
import CartCard from './CartCard';
import { allPrice } from './TotalPrice';


const ChooseCart = ({ updateCart, cart }) => {

    const { _, updatePrice, updateKelishuv } = allPrice()
    // calculate all price
    const allPriceUpdate = () => {
        let store = getFromLS("cart") || []
        let sum = 0;
        let sumK = 0;
        store.forEach(elem => {
            if (elem.price === null) {
                sumK += 1
            }
            else {
                sum += elem.price * elem.count
            }
        })
        updatePrice(sum)
        updateKelishuv(sumK)
    }
    useEffect(() => {
        allPriceUpdate()
    }, [])

    // store
    const toggleHandler = (card) => {
        toggleFn("cart", card, updateCart)
        allPriceUpdate()
    }
    // add cuantity
    const quantityHandler = (ishora, card) => {
        if (ishora) {
            card.count = card.count + 1
        }
        else {
            card.count = card.count !== 1 ? card.count - 1 : 1
        }
        let store = getFromLS("cart") || []
        store.forEach(item => { item.id == card.id ? item.count = card.count : '' })
        addToLS("cart", store)
        allPriceUpdate()
    }
    return (
        <div className='p-3 h-full transition-all duration-300'>
            {cart?.length ? cart?.map((card, index) => (
                <CartCard quantityHandler={quantityHandler} toggleHandler={toggleHandler} card={card} key={index} />
            )) : <p className='min-h-[500px] ps-10'>Maxsulot topilmadi...</p>}
        </div>
    )
}

export default ChooseCart