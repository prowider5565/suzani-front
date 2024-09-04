import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


import aohuna from "./img/aohuna.png";
import edan from "./img/edan.png";
import healforce from "./img/heal force.png";
import unitedimaging from "./img/unitedimaging.png";
import Neurotech from "./img/Neurotech.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const data = [
    {
        url: Neurotech,
        title: "Neurotech"
    },
    {

        url: edan,
        title: "EDAN"
    },
    {
        url: "https://bir.uz/img/bir.uz/uploads/logo32.png",
        title: "HEMA"
    },
    {
        url: "https://bir.uz/files/bir.uz/images/partners/4.png",
        title: "Angell Technology"
    },
    {
        url: aohuna,
        title: "Aohua"
    },
    {
        url: unitedimaging,
        title: "United Imaging"
    },
    {
        url: healforce,
        title: "Heal Force"
    },
]

const AboutOur = () => {
    return (
      <div className="main-container min-h-[46vh] mb-10">
        <h1 className="text-2xl mt-8">Biz haqimizda:</h1>
        <div className="flex flex-col my-8 gap-3 text-justify">
          <div>
            <span className="font-semibold">"SUZANE.UZ"</span> Masu'liyati
            cheklangan jamiyati{" "}
            <span className="text-blue-500">
              (ЯТТ «ТАДЖИБАЕВ ҲАКИМ ИСАКЖАНОВИЧ» )
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur architecto totam quo, officia, magni voluptatibus aperiam praesentium veniam libero ipsa temporibus adipisci cumque vel dolor voluptas quisquam harum accusamus laborum?
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim ipsum nostrum nihil doloribus autem earum. Praesentium eveniet ad cumque mollitia molestiae ex iste aut minima impedit, ullam nisi quas a incidunt dolore commodi iusto delectus laboriosam totam tempore itaque! Hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, incidunt quo. Aperiam nemo ad ipsa praesentium. Odit, non. Magnam sunt ad, officiis accusantium asperiores velit, animi pariatur vel inventore dolorum voluptatum quod molestiae, rem in minima aliquam. Magnam ut explicabo, neque nisi nihil quidem officia eum assumenda deserunt. Neque fuga, natus nostrum modi pariatur velit! Consequuntur doloribus harum iusto provident veritatis illo, delectus iste laudantium nostrum cumque ipsam velit officiis dolore expedita voluptatibus sequi eum porro vero ducimus saepe quae unde amet ad tempora? Alias pariatur ipsa cupiditate, at minus impedit quasi ut dolorem eveniet dolore rerum nesciunt suscipit consequuntur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, facilis aliquam provident veritatis animi natus dolor officiis impedit vitae? Veniam inventore optio cupiditate rerum voluptatem, aperiam saepe odio ab veritatis.
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-center my-5">Bizni hamkorlarimiz</h1>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              789: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
            autoplay={{
              delay: 2500,
              // disableOnInteraction: false,
            }}
            navigation={false}
            modules={[Pagination, Autoplay, Navigation]}
            className="mySwiper"
          >
            {data.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center">
                  <img src={item.url} alt="" />
                  <h1 className="text-black">{item.title}</h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
}

export default AboutOur