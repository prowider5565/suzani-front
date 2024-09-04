import React from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { getFromLS } from '../../utils/localStorage';

const Checked = ({ cardId }) => {
    let dataFromLS = getFromLS("cart") || []
    const isInCart = dataFromLS?.find(item => item.uuid === cardId)


    return (
        <div className='flex gap-2 absolute right-2 top-2'>

            {isInCart && (
                <div className='bg-blue-500 text-white p-1 rounded-full '>
                    <HiOutlineShoppingCart className={"w-4 sm:w-5 h-4 sm:h-5"} />
                </div>
            )}
        </div>
    )
}

export default Checked