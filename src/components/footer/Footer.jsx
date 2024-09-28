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
            src="../../../public/photo_2024-08-19_21-01-54.png"
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

// import React from 'react'
// import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import { getCompanyInfo, getSocialLinks } from '../../hooks/productsHook';

// const Footer = () => {
//    const { data } = getSocialLinks();
//     console.log(data, "bu data");
//     return (
//       <div className="bg-blue-50 pt-20 border-t pb-10">
//         <div className="main-container bg-transparent grid col-span-1 md:grid-cols-4  xl:grid-cols-3  gap-20">
//           {/* <div className='sm:col-span-4 xl:col-span-3'>
//                     <h1 className='text-bg text-3xl font-bold'>MedTexnika</h1>
//                     <p>Namangan viloyatidagi birinchi eng katta tibbiyot qurilmalari, tibbiy apparaturalar va tibbiy jihozlar, laboratoriya reaktivlari, laboratoriya reagentlari savdosi bilan shug'ullanuvchi savdo markazidir.</p>
//                 </div> */}
//           <ul className="sm:col-span-2 xl:col-span-1">
//             {/* <h1 className="text-2xl font-semibold mb-1">Suzani.Uz</h1>
//              */}
//             <img
//               src="../../../public/photo_2024-08-19_21-01-54.png"
//               alt=""
//               className="w-48"
//             />
//             <li className="py-1">
//               <Link to={"/biz-haqimizda"}>About us</Link>
//             </li>
//             <li className="py-1">
//               <Link to={"/contact"}>Contact Us</Link>
//             </li>
//           </ul>
//           <ul className="sm:col-span-2 xl:col-span-1">
//             <h1 className="text-2xl font-semibold mb-1">Contact</h1>
//             <li className="py-1">
//               <span>Addres:</span>
//               <span>{data?.address_text}</span>
//             </li>
//             <li className="py-1">
//               <span>Contact:</span>
//               <span>
//                 <a href={`tel:${data?.phone_number}`}>{data?.phone_number}</a>
//               </span>
//             </li>
//             <li className="py-1">
//               <span>Email:</span>
//               <span>
//                 <a href="#" className="break-all">
//                   suzani@mail.ru
//                 </a>
//               </span>
//             </li>
//           </ul>
//           <ul className="sm:col-span-2 xl:col-span-1">
//             <h1 className="text-2xl font-semibold mb-1">Our social media</h1>
//             <div className="flex gap-3 mt-5">
//               {data?.telegram && (
//                 <a
//                   href={data[0]?.telegram}
//                   className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
//                 >
//                   <FaTelegramPlane className="w-6 h-6" />
//                 </a>
//               )}
//               {data?.instagram && (
//                 <a
//                   href={data?.instagram}
//                   className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
//                 >
//                   <FaInstagram className="w-6 h-6" />
//                 </a>
//               )}
//               {data?.facebook && (
//                 <a
//                   href={data?.facebook}
//                   className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
//                 >
//                   <FaFacebookF className="w-6 h-6" />
//                 </a>
//               )}
//               {data?.youtube && (
//                 <a
//                   href={data?.youtube}
//                   className="bg w-[45px] h-[45px] rounded-full flex items-center justify-center "
//                 >
//                   <FaYoutube className="w-6 h-6" />
//                 </a>
//               )}
//             </div>
//           </ul>
//         </div>
//       </div>
//     );
// }

// export default Footer
