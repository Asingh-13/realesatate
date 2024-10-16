import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Box, IconButton } from "@chakra-ui/react";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const ImageScrollBar = ({ data }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box padding="20px" position="relative">
      <Slider ref={sliderRef} {...settings}>
        {data.map((item) => (
          <div key={item.id}>
            <Image
              placeholder='blur'
              blurDataURL={item.url}
              src={item.url}
              width={400}
              height={300}
              alt="property"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        ))}
      </Slider>
      <Box position="absolute" top="50%" width="95%" display="flex" justifyContent="space-between" transform="translateY(-50%)">
        <IconButton
          onClick={() => sliderRef.current.slickPrev()}
          aria-label="Previous"
          icon={<MdArrowBack />}
          bg="rgba(0, 0, 0, 0.5)"
          color="#fff"
          fontSize="28px"
          padding="10px"
          borderRadius="50%"
          _hover={{ background: "rgba(0, 0, 0, 0.7)" }}
          marginLeft="10px" // Add margin to keep it in the frame
        />
        <IconButton
          onClick={() => sliderRef.current.slickNext()}
          aria-label="Next"
          icon={<MdArrowForward />}
          bg="rgba(0, 0, 0, 0.5)"
          color="#fff"
          fontSize="28px"
          padding="10px"
          borderRadius="50%"
          _hover={{ background: "rgba(0, 0, 0, 0.7)" }}
          marginRight="10px" // Add margin to keep it in the frame
        />
      </Box>
    </Box>
  );
};

export default ImageScrollBar;
