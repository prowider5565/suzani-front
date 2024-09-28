// // src/components/Cart.jsx
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { calculateTotal } from "../../context/cart";
// import ProductCard from "../products/ProductCard";
// import CartOrder from "./CartOrder";
// import Portal from "../portal/Index";
// import { OrderedForm } from "../login/OrderedForm";
// import { SignIn } from "../login/SignIn";
// import { allPrice } from "./TotalPrice";

// const Cart = () => {
//     const cart = useSelector((state) => state.cart.cartItems);
//     console.log(cart, "sxsxsxssxsxsxssxs")
//     const totalPrice = useSelector((state) => state.cart.totalPrice);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(calculateTotal());
//     }, [cart, dispatch]);

//     return (
//       <div className="xl:container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-4">Savat</h1>
//         {cart.length === 0 ? (
//           <div className="w-full min-h-[460px] flex items-center justify-center font-semibold text-xl">
//             Savat bo'sh
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="flex justify-between gap-10">
//               <div className="flex flex-1 flex-col gap-4">
//                 {cart.map((item) => (
//                   <CartOrder item={item} key={item?.uuid} />
//                 ))}
//               </div>
//               <div className="border w-[420px] h-[620px] sticky top-44 xl:top-28 rounded-lg p-4">
//                 <div className="mb-4">
//                   <p className="text-lg font-medium">Sizning buyurtmangiz</p>

//                   <div className="flex items-center justify-between">
//                     <p className="text-sm">Maxsulotlar: ({cart?.length})</p>
//                     <p className="text-blue-500">{totalPrice?.brm()}$</p>
//                   </div>
//                 </div>

//                 <p className="font-semibold text-lg mb-3">Buyurtma formasi</p>
//                 <div className="for_payment_form"></div>
//                 <div>
//                   <Portal
//                     ModalContent={OrderedForm}
//                     classNameBtn={"bg px-3 py-1 rounded"}
//                     text={"Sign up"}
//                   />
//                   <Portal
//                     ModalContent={SignIn}
//                     classNameBtn={"bg px-3 py-1 rounded"}
//                     text={"Sign in"}
//                   />

                 
//                 </div>
//               </div>
//             </div>
//             {/* <div className="text-right text-xl font-semibold">
//                         Jami: ${totalPrice.toFixed(2)}
//                     </div> */}
//           </div>
//         )}
//       </div>
//     );
// };

// export default Cart;









//////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { calculateTotal } from "../../context/cart";
// import CartOrder from "./CartOrder";
// import Portal from "../portal/Index";
// import { OrderedForm } from "../login/OrderedForm";
// import { SignIn } from "../login/SignIn";

// const Cart = () => {
//   const cart = useSelector((state) => state.cart.cartItems);
//   console.log(cart)
//   const totalPrice = useSelector((state) => state.cart.totalPrice);
//   console.log(totalPrice, "totalPrice");
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     full_name: "",
//     address: "",
//     country: "",
//     region: "",
//     sale_amount: totalPrice,
//     phone_number: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const orders = cart.map((item) => ({
//       product_id: item.uuid,
//       product_name: item.name,
//       count: item.stock_quantity,
//     }));

//     const payload = { ...formData, orders };

//     try {
//       const response = await fetch(
//         "https://api.suzani-abdulhakim.uz/payments/process/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Success:", data);

//         if (data.redirect_url) {
//           window.location.href = data.redirect_url;
//         }
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   useEffect(() => {
//     dispatch(calculateTotal());
//   }, [cart, dispatch]);

//   return (
//     <div className="xl:container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Savat</h1>
//       {cart.length === 0 ? (
//         <div className="w-full min-h-[460px] flex items-center justify-center font-semibold text-xl">
//           Savat bo'sh
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="flex justify-between gap-10">
//             <div className="flex flex-1 flex-col gap-4">
//               {cart.map((item) => (
//                 <CartOrder item={item} key={item?.uuid} />
//               ))}
//             </div>
//             <div className="border w-[420px] h-[620px] sticky top-44 xl:top-28 rounded-lg p-4">
//               <div className="mb-4">
//                 <p className="text-lg font-medium">Sizning buyurtmangizzzzz</p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm">Maxsulotlar: ({cart?.length})</p>
//                   <p className="text-blue-500">{totalPrice?.brm()}$</p>
//                 </div>
//               </div>

//               <p className="font-semibold text-lg mb-3">Buyurtma formasi</p>
//               <div className="for_payment_form">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <input
//                     type="text"
//                     name="full_name"
//                     placeholder="Full Name"
//                     value={formData.full_name}
//                     onChange={handleChange}
//                     required
//                     className="border rounded p-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="border rounded p-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     name="country"
//                     placeholder="Country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                     className="border rounded p-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     name="region"
//                     placeholder="Region"
//                     value={formData.region}
//                     onChange={handleChange}
//                     required
//                     className="border rounded p-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     name="phone_number"
//                     placeholder="Phone Number"
//                     value={formData.phone_number}
//                     onChange={handleChange}
//                     required
//                     className="border rounded p-2 w-full"
//                   />
//                   <input type="hidden" name="sale_amount" value={totalPrice} />
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     Submit Order
//                   </button>
//                 </form>
//               </div>

//               <Portal
//                 ModalContent={OrderedForm}
//                 classNameBtn={"bg px-3 py-1 rounded"}
//                 text={"Sign up"}
//               />
//               <Portal
//                 ModalContent={SignIn}
//                 classNameBtn={"bg px-3 py-1 rounded"}
//                 text={"Sign in"}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


// 3////////////////////////////////////


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal } from "../../context/cart";
import CartOrder from "./CartOrder";
import Portal from "../portal/Index";
import { OrderedForm } from "../login/OrderedForm";
import { SignIn } from "../login/SignIn";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();

  // State to manage form data and token presence
  const [formData, setFormData] = useState({
    full_name: "",
    address: "",
    country: "",
    region: "",
    sale_amount: totalPrice,
    phone_number: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the access token on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    setIsLoggedIn(!!accessToken); // Set isLoggedIn to true if access token exists
  }, []);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cart, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orders = cart.map((item) => ({
      product_id: item.uuid,
      product_name: item.name,
      count: item.stock_quantity,
    }));

    const payload = { ...formData, orders };

    try {
      const response = await fetch(
        "https://api.suzani-abdulhakim.uz/payments/process/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);

        // Redirect to the payment URL if it exists
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="xl:container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Savat</h1>
      {cart.length === 0 ? (
        <div className="w-full min-h-[460px] flex items-center justify-center font-semibold text-xl">
          Savat bo'sh
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between gap-10">
            <div className="flex flex-1 flex-col gap-4">
              {cart.map((item) => (
                <CartOrder item={item} key={item?.uuid} />
              ))}
            </div>
            <div className="border w-[420px] h-[620px] sticky top-44 xl:top-28 rounded-lg p-4">
              {isLoggedIn ? (
                // If user is logged in, show the payment form
                <>
                  <div className="mb-4">
                    <p className="text-lg font-medium">Sizning buyurtmangiz</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Maxsulotlar: ({cart?.length})</p>
                      <p className="text-blue-500">{totalPrice?.brm()}$</p>
                    </div>
                  </div>
                  <p className="font-semibold text-lg mb-3">Buyurtma formasi</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Full Name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="region"
                      placeholder="Region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="text"
                      name="phone_number"
                      placeholder="Phone Number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="hidden"
                      name="sale_amount"
                      value={totalPrice}
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Submit Order
                    </button>
                  </form>
                </>
              ) : (
                // If user is not logged in, show Sign In and Sign Up buttons
                <>
                  <div className="mb-4">
                    <p className="text-lg font-medium">Sizning buyurtmangiz</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Maxsulotlar: ({cart?.length})</p>
                      <p className="text-blue-500">{totalPrice?.brm()}$</p>
                    </div>
                  </div>
                  <h1 className="text-center text-2xl">
                    Rasmiylashtirish uchun ro'yxatdan o'ting
                  </h1>

                  <div className="mt-5 flex justify-center gap-5">
                    <Portal
                      ModalContent={OrderedForm}
                      classNameBtn={"bg px-3 py-1 rounded"}
                      text={"Sign up"}
                    />
                    <Portal
                      ModalContent={SignIn}
                      classNameBtn={"bg px-3 py-1 rounded"}
                      text={"Sign in"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;