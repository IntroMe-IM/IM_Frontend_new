import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./CircularCarousel.css";

const parseReactElement = (item) => {
  const { type, key, props } = item;
  return React.createElement(type, { key, ...props });
};

const CircularCarousel = ({ items }) => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      centeredSlides={true}
      loop={true}
      pagination={{ clickable: true }} // Pagination 추가
      style={{ height: '100%' }} // Swiper 높이 설정
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {parseReactElement(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CircularCarousel;
