import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../home-slider/imgs/slide1.jpg";
import slide2 from "../home-slider/imgs/slide2.jpg";
import slide3 from "../home-slider/imgs/slide3.jpg";
import slide4 from "../home-slider/imgs/slide4.jpg";
import slide5 from "../home-slider/imgs/slide5.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { getCarausel } from "../../../hooks/productsHook";

const HomeSlider = () => {
  const [isfetching, setIsfetching] = useState(false);
  const [dataSlider, setDataSlider] = useState();
  const { data } = getCarausel();
  // const data = [
  //   {
  //     content_type: "video",
  //     url: "https://example.com/video1.mp4",
  //     image: "",
  //   },
  //   {
  //     content_type: "image",
  //     url: "",
  //     image: "https://example.com/image1.jpg",
  //   },
  //   {
  //     content_type: "video",
  //     url: "https://example.com/video2.mp4",
  //     image: "",
  //   },
  //   {
  //     content_type: "image",
  //     url: "",
  //     image: "https://example.com/image2.jpg",
  //   },
  // ];
  return (
    <div>
      <>
        {data && data.length ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 15500,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {data?.map((item, i) => (
              <SwiperSlide key={i}>
                {item?.content_type === "video" ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={`${
                      item?.url.replace("watch?v=", "embed/").split("&")[0]
                    }?autoplay=1&controls=0`}
                    // src={item?.url.replace("watch?v=", "embed/")}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="YouTube video"
                  ></iframe>
                ) : (
                  // <video
                  //   controls
                  //   className="h-[250px] sm:h-[350px] md:h-[400px] rounded-xl object-cover origin-center w-full"
                  // >
                  //   <source src={item?.url} type="video/mp4" />
                  //   Sizning brauzeringiz ushbu videoni qo'llab-quvvatlamaydi.
                  // </video>
                  <img
                    src={item?.image}
                    alt=""
                    className="h-[250px] sm:h-[350px] md:h-[400px] rounded-xl object-cover origin-center w-full"
                  />
                )}
              </SwiperSlide>
              // <SwiperSlide key={i}>
              //   <p>{item?.content_type}</p>
              //   <img
              //     src={item?.image}
              //     alt=""
              //     className="h-[250px] sm:h-[350px] md:h-[400px] rounded-xl object-cover origin-center w-full"
              //   />
              // </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          "Information not included!"
        )}
      </>
    </div>
  );
};

export default HomeSlider;

