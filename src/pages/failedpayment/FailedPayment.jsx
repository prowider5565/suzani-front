import React from 'react'

const FailedPayment = () => {
  return (
    <div>
      <div className=" h-96 pt-1 flex flex-col mt-48">
        <p className="text-center text-red-600 text-4xl font-bold">ERROR !</p>
        <h1 className="text-center text-8xl font-bold">
          <span className="line-through">Payment</span> failed
        </h1>
        <p className="text-center text-2xl pt-4">
          Payment failed, please try again.
        </p>

        <button className=" m-auto bg w-max px-5 flex-row gap-2 flex items-center justify-center text-white rounded-md p-2">
          <a href="/">TRY AGAIN</a>
        </button>
      </div>
    </div>
  );
}

export default FailedPayment