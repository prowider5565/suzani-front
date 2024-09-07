import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getASingleProduct,
  postReview,
  getProductReviews,
} from "../../hooks/productsHook";
import Spinner from "../../components/spinner/Spinner";
import Checked from "../../components/products/Checked";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaCommentDots } from "react-icons/fa";
import { useStore } from "../../components/navbar/Navbar";
import { toggleFn } from "../../utils/toggleFn";
import { usrImg } from "../../api/axios";
import StarRating from "../../components/starrating/StarRating";

const Detail = () => {
  const { cardId } = useParams();
  const imgRef = useRef();
  const { refetch, data, isFetched } = getASingleProduct(cardId);
  console.log(data, "bu single data")
  const { data: reviews, isLoading: isReviewsLoading } =
    getProductReviews(cardId);
    console.log(reviews, "comments");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [fullName, setFullName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate } = postReview();

  useEffect(() => {
    if (cardId !== undefined) {
      refetch();
    }
  }, [cardId, refetch]);

  const imgHandler = (e) => {
    imgRef.current.src = e.target.src;
  };

  const { cart, updateCart } = useStore();
  const quantityHandler = (card) => {
    toggleFn("cart", card, updateCart);
  };

  const resetForm = () => {
    setComment("");
    setRating(0);
    setFullName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        product: cardId,
        rating: parseInt(rating),
        comment,
        full_name: fullName,
      },
      {
        onSuccess: () => {
          resetForm();
          setIsModalOpen(false);
          window.location.reload();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const modalOverlayStyle = {
    opacity: isModalOpen ? 1 : 0,
    pointerEvents: isModalOpen ? "auto" : "none", 
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transition: "opacity 0.3s ease",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "500px",
    position: "relative",
    transform: isModalOpen ? "scale(1)" : "scale(0.8)",
    opacity: isModalOpen ? 1 : 0,
    transition: "transform 0.3s ease, opacity 0.3s ease",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    color: "gray",
    cursor: "pointer",
    fontSize: "1.5rem",
  };

  return (
    <div className="px-4">
      {!isFetched && <Spinner />}
      {data !== undefined ? (
        <div className="main-container mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 p-4 sm:gap-8">
          <div className="flex overflow-hidden flex-col gap-3 col-span-1 md:col-span-1 lg:col-span-2 rounded-md">
            <div className="relative cursor-pointer aspect-w-5 aspect-h-4 overflow-hidden">
              <img
                ref={imgRef}
                className="w-full mx-auto h-full object-cover object-center"
                // src={
                //   data?.images[0]?.image
                //     ? usrImg + data.images[0].image
                //     : "https://www.shutterstock.com/image-illustration/no-picture-available-placeholder-thumbnail-260nw-2179364083.jpg"
                // }
                src={usrImg + data?.cover_image}
                alt=""
              />
              <Checked cardId={data?.uuid} />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {data?.images?.map((img, index) => (
                <button
                  className="border-2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 p-2 rounded-md overflow-hidden focus:border-blue-500"
                  key={index}
                >
                  <img
                    className="cursor-pointer w-full h-full object-cover object-center"
                    onClick={imgHandler}
                    src={usrImg + img}
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 col-span-1 md:col-span-1 lg:col-span-3 rounded-md">
            <div className="text-black hover:text-blue-500 transition-all text-base sm:text-lg font-semibold cursor-pointer">
              {data?.name}
            </div>
            <div>
              <p className="text-gray-400 text-sm block">
                Price :
                <span className="text-blue-500 text-base sm:text-lg font-semibold ml-3">
                  {data?.price === null
                    ? "Kelishuv asosida"
                    : (+data?.price).brm()}
                  <span className="pl-2">{data?.currency || "USD"}</span>
                </span>
              </p>
              <p className="text-black text-sm block">
                <span className="text-gray-400">Amount:</span>{" "}
                {data?.stock_quantity}
              </p>
            </div>
            <button
              onClick={() => quantityHandler(data)}
              id="cart"
              className="bg w-max px-5 flex-row gap-2 flex items-center justify-center text-white rounded-md p-2"
            >
              <HiOutlineShoppingCart className="w-4 sm:w-6 h-4 hidden sm:block sm:h-6" />
              <span className="text-sm sm:text-base">Purchase</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg w-max px-5 flex-row gap-2 flex items-center justify-center text-white rounded-md p-2"
            >
              <FaCommentDots className="w-4 sm:w-6 h-4 hidden sm:block sm:h-6" />
              Comment<a href=""></a>
            </button>
          </div>

          <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={closeButtonStyle}
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
                />
                <StarRating
                  className="mt-2"
                  rating={rating}
                  onRatingChange={setRating}
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Izohingizni yozing"
                  className="w-full mt-3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="w-full col-span-1 md:col-span-2 lg:col-span-5">
            <h2 className="text-lg font-semibold mb-4">Product Reviews</h2>
            {isReviewsLoading ? (
              <Spinner />
            ) : reviews?.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow-sm rounded-md mb-4 border border-gray-300"
                >
                  <div className="flex items-center mb-2">
                    <div className="font-bold text-gray-800">
                      {review.full_name}
                    </div>
                    <div className="ml-2 text-sm text-gray-500">
                      {new Date(review.date_created).toLocaleDateString()}
                    </div>
                  </div>
                  <StarRating rating={review.rating} readonly />
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <p>There was an error loading data.</p>
      )}
    </div>
  );
};

export default Detail;

// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   getASingleProduct,
//   postReview,
//   getProductReviews,
// } from "../../hooks/productsHook"; // Import the hook
// import Spinner from "../../components/spinner/Spinner";
// import Checked from "../../components/products/Checked";
// import { HiOutlineShoppingCart } from "react-icons/hi2";
// import { useStore } from "../../components/navbar/Navbar";
// import { toggleFn } from "../../utils/toggleFn";
// import { usrImg } from "../../api/axios";

// const Detail = () => {
//   const { cardId } = useParams();
//   const imgRef = useRef();
//   const { refetch, data, isFetched } = getASingleProduct(cardId);
//   const { data: reviews, isLoading: isReviewsLoading } = getProductReviews(cardId);
//   console.log(reviews, "komments");
//   const [comment, setComment] = useState("");
//   const [rating, setRating] = useState("");
//   const [fullName, setFullName] = useState("");

//   const { mutate } = postReview();

//   useEffect(() => {
//     if (cardId !== undefined) {
//       refetch();
//     }
//   }, [cardId, refetch]);

//   const imgHandler = (e) => {
//     imgRef.current.src = e.target.src;
//   };

//   const { cart, updateCart } = useStore();
//   const quantityHandler = (card) => {
//     toggleFn("cart", card, updateCart);
//   };

//   const resetForm = () => {
//     setComment("");
//     setRating("");
//     setFullName("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutate(
//       {
//         product: cardId,
//         rating: parseInt(rating),
//         comment,
//         full_name: fullName,
//       },
//       {
//         onSuccess: () => {
//           resetForm();
//         },
//         onError: (error) => {
//           console.log(error);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       {!isFetched && <Spinner />}
//       {data !== undefined ? (
//         <div className="main-container mt-10 grid grid-cols-1 lg:grid-cols-5 p-10 sm:gap-16 gap-5">
//           <div className="flex overflow-hidden flex-col gap-3 col-span-1 sm:col-span-2 rounded-md">
//             <div className="relative cursor-pointer aspect-[5/4] overflow-hidden">
//               <img
//                 ref={imgRef}
//                 className="w-full mx-auto h-full object-cover object-center"
//                 src={usrImg + data?.images[0].image}
//                 alt=""
//               />
//               <Checked cardId={data?.uuid} />
//             </div>
//             <div className="flex gap-1">
//               {data?.images.map((img, index) => (
//                 <button
//                   className="border-2 w-24 h-24 p-2 rounded-md overflow-hidden focus:border-blue-500"
//                   key={index}
//                 >
//                   <img
//                     className="cursor-pointer w-full h-full object-cover object-center"
//                     onClick={imgHandler}
//                     src={usrImg + img.image}
//                     alt=""
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex flex-col gap-3 col-span-1 sm:col-span-3 rounded-md">
//             <div className="text-black hover:text-blue-500 transition-all text-sm sm:text-lg font-semibold sm:font-bold cursor-pointer">
//               {data?.name}
//             </div>
//             <div>
//               <p className="text-gray-400 text-xs sm:text-sm block">
//                 Narx:
//                 <span className="text-blue-500 text-sm sm:text-lg font-semibold ml-3">
//                   {data?.price === null
//                     ? "Kelishuv asosida"
//                     : (+data?.price).brm()}
//                   <span className="pl-2">{data?.currency}</span>
//                 </span>
//               </p>
//               <p className="text-black text-xs sm:text-sm block">
//                 <span className="text-gray-400">Miqdori:</span>{" "}
//                 {data?.stock_quantity}
//               </p>
//             </div>
//             <button
//               onClick={() => quantityHandler(data)}
//               id="cart"
//               className="bg w-max px-5 flex-row gap-2 flex items-center justify-center text-white rounded-md p-1 sm:py-2"
//             >
//               <HiOutlineShoppingCart
//                 className={"w-4 sm:w-6 h-4 hidden sm:block sm:h-6"}
//               />
//               <span className="text-sm sm:text-base">Sotib olish</span>
//             </button>
//           </div>
//           <div className="w-full">
//             <form
//               className="bg-white p-6 rounded-lg shadow-lg w-80"
//               onSubmit={handleSubmit}
//             >
//               <input
//                 type="text"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Full Name"
//                 className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
//               />
//               <input
//                 type="number"
//                 value={rating}
//                 onChange={(e) => setRating(e.target.value)}
//                 placeholder="Rating"
//                 className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
//               />
//               <textarea
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//                 placeholder="Izohingizni yozing..."
//                 className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
//               >
//                 Yuborish
//               </button>
//             </form>
//           </div>
//           <div className="mt-5 col-span-5">
//             <span className="text-gray-400">Maxsulot haqida :</span>
//             <div>{data?.description}</div>
//           </div>
//           <div className="mt-10 col-span-5">
//             <h3 className="text-lg font-semibold">Product Reviews</h3>
//             {isReviewsLoading ? (
//               <Spinner />
//             ) : reviews && reviews.length > 0 ? (
//               reviews.map((review) => (
//                 <div key={review.id} className="mt-4 p-4 border rounded-md">
//                   <p className="text-gray-600">
//                     <strong>{review.full_name}</strong>: {review.comment}
//                   </p>
//                   <p className="text-gray-500">Rating: {review.rating}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No reviews yet.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default Detail;
