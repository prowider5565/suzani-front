import React from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Checked from "./Checked";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getFromLS } from "../../utils/localStorage";
import { usrImg } from "../../api/axios";

const ProductCard = ({ card, quantityHandler }) => {
  const navigate = useNavigate();
  let dataFromLS = getFromLS("cart") || [];
  const isInCart = dataFromLS?.find((item) => item.uuid === card?.uuid);

  return (
    <Card className="overflow-hidden p-0 rounded-lg">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none  aspect-[5/3]"
      >
        <Checked cardId={card?.uuid} />
        <img
          className="w-full h-full object-cover"
          src={
            usrImg + card?.cover_image ||
            "https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw="
          }
          alt=""
        />
      </CardHeader>
      <CardBody className="sm:p-3 p-2  pb-0">
        <div
          onClick={() => navigate(`/mahsulot-haqida/${card?.uuid}`)}
          className="text-black hover:text-blue-500 transition-all text-sm sm:text-lg font-semibold sm:font-bold cursor-pointer"
        >
          {card?.name}
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm block">
            Price:
            <span className="text-blue-500 text-sm sm:text-lg font-semibold ml-3">
              {card?.price === null ? "Kelishuv asosida" : (+card?.price).brm()}
              <span className="pl-2">{card?.currency || 'USD'}</span>
            </span>
          </p>
          <p className="text-black text-xs sm:text-sm block">
            <span className="text-gray-400">Amount :</span>
            {card?.stock_quantity}
          </p>
          <p className="text-black text-xs sm:text-sm block">
            <span className="text-gray-400 pr-2">At a discount :</span>
            {card?.discount_price} %
          </p>
        </div>
      </CardBody>
      <CardFooter className="sm:p-3 p-2 pt-0  mt-auto">
        <button
          onClick={() => quantityHandler(card)}
          id="cart"
          className={`${
            isInCart ? "bg1" : "bg"
          } w-full flex-row mt-3 gap-2 flex items-center justify-center  text-white rounded-md p-1 sm:py-2 flex-1`}
        >
          <HiOutlineShoppingCart
            className={"w-4 sm:w-6 h-4 hidden sm:block sm:h-6"}
          />
          <span className="text-sm sm:text-base ">
            {isInCart ? "Added to cart" : "Purchase"}
          </span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
