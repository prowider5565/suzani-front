import React from 'react'
import "./spinner.css"

const Spinner = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen backdrop-blur-md z-10 flex items-center justify-center'>
            <div className="half-circle-spinner">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
        </div>
    )
}

export default Spinner