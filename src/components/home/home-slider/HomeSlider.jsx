import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { getCarausel } from "../../../hooks/productsHook";

const getYouTubeVideoID = (url) => {
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === "youtu.be") {
            return parsedUrl.pathname.slice(1);
        } else if (
            parsedUrl.hostname === "www.youtube.com" ||
            parsedUrl.hostname === "youtube.com"
        ) {
            return parsedUrl.searchParams.get("v");
        } else {
            return null;
        }
    } catch (error) {
        console.error("Invalid URL:", url);
        return null;
    }
};

const HomeSlider = React.memo(() => {
    const { data } = getCarausel();

    const slides = useMemo(() => {
        if (!data) return [];

        return data.map((item, i) => {
            if (item?.content_type === "video") {
                const videoID = getYouTubeVideoID(item?.youtube_link);
                if (videoID) {
                    return (
                        <SwiperSlide key={i}>
                            <div className="iframe-container">
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&controls=0`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={`YouTube video ${i}`}
                                ></iframe>
                            </div>
                        </SwiperSlide>
                    );
                } else {
                    return (
                        <SwiperSlide key={i}>
                            <div className="flex items-center justify-center h-[400px]">
                                <p>Invalid video URL</p>
                            </div>
                        </SwiperSlide>
                    );
                }
            } else if (item?.content_type === "image") {
                return (
                    <SwiperSlide key={i}>
                        <img
                            src={item?.image}
                            alt={`Slide ${i}`}
                            className="h-[250px] sm:h-[350px] md:h-[400px] rounded-xl object-cover origin-center w-full"
                        />
                    </SwiperSlide>
                );
            } else {
                return (
                    <SwiperSlide key={i}>
                        <div className="flex items-center justify-center h-[400px]">
                            <p>No content available</p>
                        </div>
                    </SwiperSlide>
                );
            }
        });
    }, [data]);

    return (
        <div className="home-slider-container">
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
                    {slides}
                </Swiper>
            ) : (
                <div>No data available!</div>
            )}
        </div>
    );
});

export default HomeSlider;
