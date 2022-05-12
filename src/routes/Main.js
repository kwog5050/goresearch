import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Links } from "../data/BrandLink";

import "../sass/main.scss";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import SwiperCore, { EffectFade, Autoplay, Pagination, Navigation } from 'swiper';
import { within } from "@testing-library/dom";
SwiperCore.use([EffectFade,Autoplay,Pagination,Navigation]);


function Main({ setLogo }) {
  setLogo("메인로고");

  const brandSlide = () => {
    let slide = [];
    const brandCount = 29;
    for (let i = 1; i <= brandCount; i++) {
      slide.push(
        <SwiperSlide className="slide">
          <a href={Links[i - 1]} target="_blank">
            <img src={`/image/slideBrand/brand${i}.png`} alt="" />
          </a>
        </SwiperSlide>
      )
    }
    return slide;
  }
  return (
    <>
      <Swiper
        className="mainSlide"
        // loop={true}
        pagination={{
          el: '.pageingBall',
          clickable: true,
        }}
        centeredSlides={true}
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false,
        }}
        >
        <SwiperSlide className="slide">
          <img src="/image/mainSlide1.jpg" alt="" />
          <div className="wrap">
            <div className="content">
              <span>바이오산업 대표기업</span>
              <h2>지오리서치</h2>
            </div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide className="slide">
          <img src="/image/mainSlide1.jpg" alt="" />
          <div className="content">
            <span>대구대표 바이오 기업,</span>
            <h2>지오리서치</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img src="/image/mainSlide1.jpg" alt="" />
          <div className="wrap">
            <div className="content">
              <span>대구대표 바이오 기업,</span>
              <h2>지오리서치</h2>
            </div>
          </div>
        </SwiperSlide> */}
        <div className="pageingBall"></div>
      </Swiper>

      <div className="brand">
        <img src="/image/content.jpg" alt="" />
        <div className="slideContainer">
          <h3>BRAND</h3>
          <div className="wrap">
            <Swiper
              className="brandSlide"
              // spaceBetween={30}
              slidesPerView={1}
              slidesPerGroup={1}
              speed={4000}
              // freeMode={true}
              breakpoints={{ 
                1200: {
                  slidesPerView:8,
                  slidesPerGroup:8,
                  speed:10000
                },
                1000: {
                  slidesPerView:6,
                  slidesPerGroup:6,
                  speed:8000
                },
                600: {
                  slidesPerView:4,
                  slidesPerGroup:4,
                  speed:6000
                },
                500: {
                  slidesPerView:3,
                  slidesPerGroup:3,
                  speed:4000
                },
                400: {
                  slidesPerView:2,
                  slidesPerGroup:2,
                  speed:4000
                },
               }}
              loop={true}
              navigation={{
                prevEl: '.prev',
                nextEl: '.next',
              }}
              autoplay={{
                "delay": 1000,
                "disableOnInteraction": false,
              }}
              >
              {brandSlide()}
              <div className="pageNav">
                <i class="nav fas fa-chevron-left prev"></i>
                <i class="nav fas fa-chevron-right next"></i>
              </div>
            </Swiper>
            <div className="content">
              <h2>지오리서치는 생명공학분야의 <br />  고객 맞춤형 솔루션을 제공합니다.</h2>
            </div>
          </div>
        </div>
        
      </div>

      
    </>
  )
}

export default Main;