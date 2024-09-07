import React from 'react';
import Slider from "react-slick";

const CustomCarousel = ({ items, settings }) =>
{
  const parseReactElement = (item) =>
  {
    try
    {
      const { type, key, props } = item;
      if (!type)
      {
        console.error("Invalid item:", item);
        return null;
      }
      return React.createElement(type, { key, ...props });
    } catch (error)
    {
      console.error("Error parsing React element:", error);
      return null;
    }
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          {parseReactElement(item)}
        </div>
      ))}
    </Slider>
  );
};

export default CustomCarousel;
