import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/css/portfolio_single_page.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Image from "next/image";

export default function PortfolioSwiper () {
    // const pagination = {
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + '</span>';
    //     },
    // };

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                // pagination={pagination}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide className='portfolio_img_parent'>
                        <Image
                            src="/portfolio_single_page_img1.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                </SwiperSlide>
                <SwiperSlide className='portfolio_img_parent'>
                    <Image
                        src="/portfolio_single_page_img1.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
                </SwiperSlide>
                <SwiperSlide className='portfolio_img_parent'>
                    <Image
                        src="/portfolio_single_page_img1.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
                </SwiperSlide>
                <SwiperSlide className='portfolio_img_parent'>
                    <Image
                        src="/portfolio_single_page_img1.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
                </SwiperSlide>
                <SwiperSlide className='portfolio_img_parent'>
                    <Image
                        src="/portfolio_single_page_img1.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
                </SwiperSlide>
                <SwiperSlide className='portfolio_img_parent'>
                    <Image
                        src="/portfolio_single_page_img1.png"
                        alt="Example Image"
                        layout="fill" // Fill the parent element
                        objectFit="cover" // Cover the area of the parent element
                        quality={100} // Image quality
                    />
                </SwiperSlide>

            </Swiper>
        </>
    );
}
