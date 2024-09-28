import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../hooks/productsHook";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const Pagination = ({ dataInp }) => {
  const [pagination, setPagination] = useState(1);
  const { refetch, data, isFetched } = getAllProducts({
    type: dataInp ? "search" : "",
    value: dataInp || "",
    typeFilter: "default",
    pagination,
  });

  useEffect(() => {
    refetch();
  }, [pagination]);

  useEffect(() => {
    if (data && data.next) {
      const url = new URL(data.next);
      const page = parseInt(url.searchParams.get("page"), 10);
      if (!isNaN(page)) {
        setPagination(page - 1);
      }
    }
  }, [data]);

  return (
    <div className="my-5">
      {(data?.next || data?.previous) && (
        <div className="flex items-center gap-3 justify-center">
          <button
            disabled={!data?.previous}
            onClick={() => setPagination(pagination - 1)}
            className="disabled:opacity-40 disabled:cursor-not-allowed bg px-3 py-1 rounded"
          >
            <MdKeyboardDoubleArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex text-2xl flex-col px-3 border-2 border-blue-500 rounded-full justify-center text-center">
            <span className="text-blue-500">{pagination}</span>
          </div>
          <button
            disabled={!data?.next}
            onClick={() => setPagination(pagination + 1)}
            className="disabled:opacity-40 disabled:cursor-not-allowed bg px-3 py-1 rounded"
          >
            <MdKeyboardDoubleArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;

// import React from 'react'
// import { addToLS, getFromLS } from '../../utils/localStorage'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import { getAllProducts } from '../../hooks/productsHook'
// import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

// const Pagination = ({ dataInp }) => {
//     // const initialPagination = getFromLS("pagination") || data?.next - 1
//     const [pagination, setPagination] = useState(1)
//     const { refetch, data, isFetched } = getAllProducts({ type: `${(dataInp && dataInp !== undefined) ? "search" : ""}`, value: dataInp || "", typeFilter: "default", pagination })
//     console.log(data, "ssssssss vvvvvvv ssssssssss vvvvvvvvvvv sssssssssss")
//     useEffect(() => {
//         // addToLS("pagination", pagination)
//         refetch()
//     }, [pagination])
//     // console.log(isFetching);

//     useEffect(() => {
//         if (data && data.next !== null) {
//             setPagination(data?.next - 1)
//         }
//     }, [data])
//     return (

//         <div className='my-5'>
//             {data?.next !== null || data?.previous !== null ?
//                 <div className='flex items-center gap-3 justify-center'>
//                     <button disabled={data?.previous === null ? true : false} onClick={() => setPagination(pagination - 1)} className='disabled:opacity-40 disabled:cursor-not-allowed bg px-3 py-1 rounded'><MdKeyboardDoubleArrowLeft className='w-6 h-6' /></button>
//                     <div className='flex text-2xl flex-col px-3 border-2 border-blue-500 rounded-full justify-center text-center'>
//                         <span className='text-blue-500'>{pagination}</span>
//                         {/* <span className='text-sm'>sahifa</span> */}
//                     </div>
//                     <button disabled={data?.next === null ? true : false} onClick={() => setPagination(pagination + 1)} className='disabled:opacity-40 disabled:cursor-not-allowed bg px-3 py-1 rounded'><MdKeyboardDoubleArrowRight className='w-6 h-6' /></button>
//                 </div> : ""
//             }
//         </div>
//     )
// }

// export default Pagination
