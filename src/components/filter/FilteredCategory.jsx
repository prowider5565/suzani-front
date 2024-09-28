import React from 'react'

const FilteredCategory = () => {
    return (
        <div className='lg:flex bg-white py-4 items-center justify-between main-container w-full'>
            <div className='flex items-center justify-between'>
                <div>
                    Sort by:
                </div>
                <button onClick={() => { setShowBar(!showBar) }} className='lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                </button>
            </div>
            <div className={`${showBar ? 'h-auto' : 'h-0'} lg:flex  lg:h-auto overflow-hidden`}>
                <ul className='lg:flex items-center  lg:ml-20 lg:gap-6 text-[15px]'>
                    <NavLink to={'/'} className='py-2 lg:py-4 block group hover:bg-red-300 lg:hover:bg-transparent rounded-md  transition-all'><span href="#" className='group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:pl-0 group-hover:pl-5 transition-all'>Головна</span></NavLink>
                    <NavLink to={'/про-нас'} className='py-2 lg:py-4 block group hover:bg-red-300 lg:hover:bg-transparent rounded-md  transition-all'><span href="#" className='group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:pl-0 group-hover:pl-5 transition-all'>Про нас</span></NavLink>
                    {state.discount.length ? <NavLink to={'/акції'} className='py-2 lg:py-4 block group hover:bg-red-300 lg:hover:bg-transparent rounded-md  transition-all'><span href="#" className='group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:pl-0 group-hover:pl-5 transition-all'>Акції</span></NavLink> : ''}
                    <NavLink to={'/контакти'} className='py-2  block lg:py-4 group hover:bg-red-300 lg:hover:bg-transparent rounded-md  transition-all'><span className='group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:pl-0 group-hover:pl-5 transition-all'>Контакти</span></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default FilteredCategory