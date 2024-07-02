// import React, { useState } from "react";
// import Slider from "react-slick";

// const Carousel = () => {
//   const settings = {
//     centerMode: true,
//     centerPadding: "100px",
//     slidesToShow: 5,
//     focusOnSelect: true,
//     dots: false,
//     infinite: true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: "40px",
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           arrows: false,
//           centerMode: true,
//           centerPadding: "40px",
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

// const images = [
//   "https://via.placeholder.com/300?text=Image+1",
//   "https://via.placeholder.com/300?text=Image+2",
//   "https://via.placeholder.com/300?text=Image+3",
//   "https://via.placeholder.com/300?text=Image+4",
//   "https://via.placeholder.com/300?text=Image+5",
// ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const handleAfterChange = (current) => {
//     setCurrentSlide(current);
//   };
//   return (
//     <div className="container mx-auto p-12">
//       <h1 className="text-white text-center pb-4 text-xl uppercase tracking-widest font-raleway">
//         Slider
//       </h1>
//       <Slider {...settings} className="center" afterChange={handleAfterChange}>
//         {images.map((image, index) => (
//           <div key={index} className="slide">
//             <img
//               src={image}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </Slider>
//       <div className="pagination text-center text-white text-lg font-raleway mt-4">
//         {currentSlide + 1} of {images.length}
//       </div>
//     </div>
//   );
// };

// export default Carousel;

import React, { useEffect } from "react";
import Slider from "react-slick";
import arrowIcon from "../../assets/icons/pack/arrowIcon.svg";
import "./style.css";

const Carousel = () => {
  const settings = {
    centerMode: true,
    centerPadding: "100px",
    slidesToShow: 5,
    focusOnSelect: true,
    dots: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const slider = document.querySelector(".slick-slider");
    slider.addEventListener("afterChange", (event, slick, currentSlide) => {
      const pagination = document.querySelector(".pagination");
      pagination.textContent = `${currentSlide + 1} of ${slick.slideCount}`;
    });
  }, []);

  const images = [
    "https://via.placeholder.com/300?text=Image+1",
    "https://via.placeholder.com/300?text=Image+2",
    "https://via.placeholder.com/300?text=Image+3",
    "https://via.placeholder.com/300?text=Image+4",
    "https://via.placeholder.com/300?text=Image+5",
    "https://via.placeholder.com/300?text=Image+6",
  ];

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <img
        className="bg-red-600 cursor-pointer rounded-lg h-16 absolute rotate-180 top-1/2 left-2/3 z-10"
        src={arrowIcon}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <img
        className="bg-red-600 cursor-pointer rounded-lg h-16 absolute top-1/2 right-2/3 z-10"
        src={arrowIcon}
        onClick={onClick}
      />
    );
  }

  return (
    <section className="bg-white py-5">
      <div className=" bg-[#F9F3FF] mx-12 px-12">
        <h2 className="text-5xl font-bold text-center rounded-lg">
          Upcoming Live Webinar
        </h2>
        <Slider
          speed={500}
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
          {...settings}
          className="center"
        >
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-contain cl"
              />
            </div>
          ))}
        </Slider>
        {/* <div className=" "></div> */}
      </div>
    </section>
  );
};

export default Carousel;
