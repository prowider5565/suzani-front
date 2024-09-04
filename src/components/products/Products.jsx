import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../hooks/productsHook'
import ProductsContainer from './ProductsContainer';
import { getFromLS } from '../../utils/localStorage';
import Spinner from '../spinner/Spinner';



const Products = () => {
    const [isReversed, setIsReversed] = useState(false);
    const [typeFilter, setTypeFilter] = useState("default")

    const pagination = getFromLS("pagination") || 1

    const { refetch, data, isFetching } = getAllProducts({ typeFilter, isReversed })

    useEffect(() => {
        refetch()
    }, [])

    // sort price and name
    const sortHandler = (type) => {
        if (type === "default") {
            refetch()
        }
        else {
            setIsReversed(!isReversed)
        }
        setTypeFilter(type)
    };

    console.log(data, "bu oldingi data");
    return (
      <div>
        <div className="flex flex-col sm:flex-row gap-3  justify-between items-center mt-10">
          <div className="text-lg font-semibold">Product Sorting :</div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => sortHandler("default")}
              className="border rounded p-2"
            >
              Usual order
            </button>
            <button
              onClick={() => sortHandler("price")}
              className="border rounded p-2"
            >
              Order by price
            </button>
            <button
              onClick={() => sortHandler("name")}
              className="border rounded p-2"
            >
              Sort by name
            </button>
          </div>
        </div>
        {isFetching && <Spinner />}
        <ProductsContainer data={data} />
      </div>
    );
}

export default Products



