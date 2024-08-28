import React, { useState } from "react";
import Products from "../components/products/Products";
import HomeSlider from "../components/home/home-slider/HomeSlider";
import { HiBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { getAllProducts, getCategoryTitle } from "../hooks/productsHook";
import { useEffect } from "react";
import { addToLS, getFromLS } from "../utils/localStorage";
import Pagination from "../components/pagination/Pagination";

const Home = () => {
  const [showBar, setShowBar] = useState(false);
  const { data } = getCategoryTitle();

  // const { data } = getSeachFilter()
  const [dataInp, setDataInp] = useState("");
  const { refetch } = getAllProducts({
    type: "search",
    typeFilter: "default",
    value: dataInp,
    setDataInp,
  });

  useEffect(() => {
    if (dataInp && dataInp !== undefined) {
      refetch();
    }
  }, [dataInp]);
  return (
    <div className="min-h-[75vh] w-full main-container  flex flex-col ">
      <div className="flex flex-col">
        <div className="flex  flex-col xl:flex-row  my-3 justify-between">
          <div className="flex items-center h-[60px]  justify-between px-2 w-full xl:w-max">
            <div>Saralash:</div>
            <button
              onClick={() => {
                setShowBar(!showBar);
              }}
              className="xl:hidden w-8 -8 flex justify-center items-center"
            >
              {!showBar ? (
                <HiBars3 className="w-7 h-7" />
              ) : (
                <TfiClose className="w-5 h-5" />
              )}
            </button>
          </div>
          <div
            className={`${
              showBar ? "h-auto" : "h-0"
            } flex flex-col xl:flex-row xl:h-auto overflow-hidden items-start  xl:items-center xl:gap-6`}
          >
            {data?.data.map((item, i) => (
              <div
                onClick={() => setDataInp(item.name)}
                key={i}
                className="transition-all cursor-pointer hover:bg-blue-300 xl:hover:bg-transparent w-full xl:w-max p-2 hover:text-white xl:hover:text-blue-500 rounded"
              >
                {item?.name}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl overflow-hidden">
          <HomeSlider />
        </div>
      </div>
      <Products />
      <Pagination dataInp={dataInp} />
    </div>
  );
};

export default Home;
