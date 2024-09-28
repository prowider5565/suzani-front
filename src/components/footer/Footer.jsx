import React from "react";
import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSocialLinks } from "../../hooks/productsHook"; 

const Footer = () => {
  const { data } = getSocialLinks(); 

  return (
    <div className="bg-blue-50 pt-20 border-t pb-10">
      <div className="main-container bg-transparent grid col-span-1 md:grid-cols-4  xl:grid-cols-3  gap-20">
        <ul className="sm:col-span-2 xl:col-span-1">
          <img
            src="https://api.suzani-abdulhakim.uz/media/logo.png"
            alt=""
            className="w-48"
          />
          <li className="py-1">
            <Link to={"/biz-haqimizda"}>About us</Link>
          </li>
          <li className="py-1">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
        </ul>
        <ul className="sm:col-span-2 xl:col-span-1">
          <h1 className="text-2xl font-semibold mb-1">Contact</h1>
          <li className="py-1">
            <span>Addres:</span>
            <span>{data && data[0]?.address}</span>
          </li>
          <li className="py-1">
            <span>Contact:</span>
            <span>
              <a href={`tel:${data && data[0]?.phone_number}`}>
                {data && data[0]?.phone_number}
              </a>
            </span>
          </li>
          <li className="py-1">
            <span>Email:</span>
            <span>
              <a href="#" className="break-all">
                suzani@mail.ru
              </a>
            </span>
          </li>
        </ul>
        <ul className="sm:col-span-2 xl:col-span-1">
          <h1 className="text-2xl font-semibold mb-1">Our social media</h1>
          <div className="flex gap-3 mt-5">
            {data && data[0]?.telegram && (
              <a
                href={data[0]?.telegram}
                className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
              >
                <FaTelegramPlane className="w-6 h-6" />
              </a>
            )}
            {data && data[0]?.instagram && (
              <a
                href={data[0]?.instagram}
                className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            )}
            {data && data[0]?.facebook && (
              <a
                href={data[0]?.facebook}
                className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
              >
                <FaFacebookF className="w-6 h-6" />
              </a>
            )}
            {data && data[0]?.youtube && (
              <a
                href={data[0]?.youtube}
                className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
              >
                <FaYoutube className="w-6 h-6" />
              </a>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
