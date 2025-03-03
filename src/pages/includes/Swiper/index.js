import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/portfolio_single_page.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from "next/image";

export default function PortfolioSwiper({ portfolioImages = [] }) {
    return (
        <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            initialSlide={0}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
        >
            {portfolioImages.map((imgSrc, index) => (
                <SwiperSlide key={index} className='portfolio_img_parent'>
                    <Image
                        src={imgSrc}
                        alt={`Portfolio Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
