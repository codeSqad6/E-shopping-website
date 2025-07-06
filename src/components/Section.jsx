// import { Container } from "react-bootstrap";
// import ProductCard from "./ProductCard/ProductCard";
// import BrandCard from "./BrandCard/BrandCard";
// import ShowMoreButton from "../utils/ShowMoreButton/ShowMoreButton";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';

// const Section = ({ title, bgColor, productItems, BrandItems }) => {
//   const products = Array.isArray(productItems) ? productItems : [];
//   const brands = Array.isArray(BrandItems) ? BrandItems : [];

//   return (
//     <section style={{ background: bgColor }}>
//       <Container>
//         <div className="heading">
//           <h1>{title}</h1>
//         </div>

//         {products.length > 0 && (
//           <>
//             <Swiper
//               modules={[Navigation]}
//               spaceBetween={20}
//               slidesPerView={4}
//                navigation={{
//     nextEl: '.swiper-button-next-custom',
//     prevEl: '.swiper-button-prev-custom',
//   }}
//               breakpoints={{
//                 320: { slidesPerView: 1 },
//                 640: { slidesPerView: 2 },
//                 992: { slidesPerView: 3 },
//                 1200: { slidesPerView: 4 },
//               }}
//             >
//               {products.map((productItem) => (
//                 <SwiperSlide className="custom" key={productItem.id}>
//                   <ProductCard
//                     title={title}
//                     productItem={productItem}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             <div className="text-center mt-4">
//               <ShowMoreButton to="/shop" />
//             </div>
//           </>
//         )}

//         {brands.length > 0 && (
//           <Swiper
//             modules={[Navigation]}
//             spaceBetween={20}
//             slidesPerView={5}
//              navigation={{
//     nextEl: '.swiper-button-next-custom',
//     prevEl: '.swiper-button-prev-custom',
//   }}
//             breakpoints={{
//               320: { slidesPerView: 2 },
//               640: { slidesPerView: 3 },
//               992: { slidesPerView: 4 },
//               1200: { slidesPerView: 5 },
//             }}
//             className="mt-5"
//           >
//             {brands.map((BrandItem) => (
//               <SwiperSlide className="custom" key={BrandItem.id}>
//                 <BrandCard
//                   title={title}
//                   BrandItem={BrandItem}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </Container>
//     </section>
//   );
// };

// export default Section;
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard/ProductCard";
import BrandCard from "./BrandCard/BrandCard";
import ShowMoreButton from "../utils/ShowMoreButton/ShowMoreButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Section = ({ title, bgColor, productItems, BrandItems }) => {
  const products = Array.isArray(productItems) ? productItems : [];
  const brands = Array.isArray(BrandItems) ? BrandItems : [];
  return (
    <section style={{ background: bgColor }}>
      <Container>
        <div className="heading">
          <h1>{title}</h1>
        </div>

        {products.length > 0 && (
          <>
            <div className="swiper-wrapper-container">
              {products.length > 4 && (
                <>
                  <div className="swiper-button-prev-custom">
                    <FaChevronLeft />
                  </div>
                  <div className="swiper-button-next-custom">
                    <FaChevronRight />
                  </div>
                </>
              )}

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2},
                  992: { slidesPerView: 1},
                  1200: { slidesPerView: 4 },
                }}
                className="product-swiper"
              >
                {products.slice(0, 10).map((productItem) => (
                  <SwiperSlide className="custom" key={productItem.id}>
                    <ProductCard title={title} productItem={productItem} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="text-center mt-4">
                <ShowMoreButton to="/shop" />
              </div>
            </div>
          </>
        )}

        {brands.length > 0 && (
          <>
            <div className="swiper-wrapper-container mt-5">
              {/* {brands.length > 5 && (
                <>
                  <div className="swiper-button-prev-custom">
                    <FaChevronLeft />
                  </div>
                  <div className="swiper-button-next-custom">
                    <FaChevronRight />
                  </div>
                </>
              )} */}

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                  nextEl: ".swiper-button-next-custom.brand",
                  prevEl: ".swiper-button-prev-custom.brand",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={5}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 1 },
                  992: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                }}
                className="brand-swiper"
              >
                {brands.map((BrandItem) => (
                  <SwiperSlide className="custom" key={BrandItem.id}>
                    <BrandCard title={title} BrandItem={BrandItem} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Section;
