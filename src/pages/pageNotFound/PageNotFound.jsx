import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotFoundAnim from '../../components/LottiAnimations/404/NotFoundAnim'

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen pt-1 flex flex-col justify-center items-center'>
      <NotFoundAnim className={"w-[70%] xl:w-[80%]"} />
      <div className='text-center'>
        <h1 className='text-3xl sm:text-4xl md:text-3xl'>Bunday sahifa topilmadi</h1>
        <button onClick={()=>navigate(-1)} className='bg px-4 py-2 rounded mt-4'>Ortga qaytish</button>
      </div>
    </div>
  )
}

export default PageNotFound