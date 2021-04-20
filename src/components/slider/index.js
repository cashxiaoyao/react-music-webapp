/*
 * @Descripttion: 
 * @version: X3版本
 * @Author: Cash
 * @Date: 2021-04-13 16:13:30
 * @LastEditors: Cash
 * @LastEditTime: 2021-04-14 17:50:59
 */
import React, { useEffect, useState } from 'react';
import { SliderContainer } from './style';
import 'swiper/swiper-bundle.css'
import Swiper, { Pagination, Autoplay } from 'swiper'
Swiper.use([Pagination, Autoplay])

function Slider(props) {
    const [sliderSwiper, setSliderSwiper] = useState(null);
    const { bannerList } = props

    useEffect(() => {
        if (bannerList.length && !sliderSwiper) {
            let newSliderSwiper = new Swiper(".slider-container", {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: { el: '.swiper-pagination' }
            });
            setSliderSwiper(newSliderSwiper);
        }
    }, [bannerList.length,sliderSwiper])
    // console.log(useEffect());
    return (
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                <div className="swiper-wrapper">
                    {
                        bannerList.map((slider,index) => {
                            return (
                                <div className="swiper-slide" key={index}>
                                    <div className="slider-nav">
                                        <img src={slider.imageUrl} alt="推荐" width="100%" height="100%" />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </SliderContainer>
    )
}

export default React.memo (Slider);