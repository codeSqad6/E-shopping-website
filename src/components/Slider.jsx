// import Slider from "react-slick"
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import { Container } from "react-bootstrap";
// import SlideCard from "./SliderCard/SlideCard"
// import { SliderData } from "../utils/products"
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderHome = () => {
  // const settings = {
  //   nav:false,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  // }
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://test.smartsto0re.shop/api/Banner")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("response:", data);
        const imgs = Array.isArray(data) ? data : [];
        setImages(imgs);
        setLoading(false);
        console.log(imgs);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{textAlign:"center"}}> Loading ....</p>;
  if (!images.length) return <p style={{textAlign:"center"}}>لا توجد صور للعرض.</p>;
  return (
    <section style={{ width: "100%", padding: "1rem 0" }}>
      <style>{`
      .swiper { width: 100%; height: 100%; }
      .swiper-slide {
        width: 100% !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .swiper-slide img {
        display: block;
        width: 100%;
        height: auto;
       
        
      }
        .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }

    `}</style>
      <Container style={{ padding: 0 }}>
        {/* /* <Slider {...settings}>
          {SliderData.map((value, index) => {
            return (
              <SlideCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
            )
          })}
        </Slider> */}
        <div
          style={{
            width: "100%",
            borderRadius: "25px", //
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Swiper
            style={{ width: "100%", height: "100%" }}
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            // pagination={{ clickable: true }}
            loop
            autoplay={{ delay: 3000 }}
          >
            {images &&
              images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    style={{
                      width: "80%",
                      height: "350px",
                      objectPosition: "center",
                      borderReduis:"10px"
                    }}
                    src={`http://test.smartsto0re.shop${img.imageUrl}`}
                    alt={img.alt || `Slide ${idx}`}
                    loading="lazy"
                  />
                  <div className="swiper-lazy-preloader"></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default SliderHome;
