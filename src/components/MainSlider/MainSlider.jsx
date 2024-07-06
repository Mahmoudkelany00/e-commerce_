import React from 'react'
import Slider from "react-slick";
import slide1 from "../../assets/images/slider-image-1.jpeg"
import slide2 from "../../assets/images/slider-image-2.jpeg"
import slide3 from "../../assets/images/slider-image-3.jpeg"


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    
    <div>
<Slider {...settings}>
      <img src={slide1} alt="" />
      <img src={slide2} alt="" />
      <img src={slide3} alt="" />

      


    </Slider>
    </div>
  )
}
