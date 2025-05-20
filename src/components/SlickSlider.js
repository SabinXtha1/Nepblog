// components/SimpleSlider.jsx

"use client"; // if you're using App Router

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function SimpleSlider({data}) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 
 
  return (
    <div className="w-full max-w-xl  mx-auto mt-10 px-4">
      <Slider {...settings}>
        {data.map((num) => (
          <div key={num} className="p-2 text-center rounded-lg text-white ">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={num || '/image.jpg'}
                      alt={'Slider Image'}
                      fill
                      className="object-cover"
                    />
            
                  </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
