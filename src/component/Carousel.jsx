import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import carousel from '../img/carousel.png'
import 다운로드 from '../img/다운로드.gif'

const Carousel = () => {
  const swiper = useSwiper();
  return (
    <div className='flex text-black items-center justify-center'>
      
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="w-[60%] h-[60%]"
    >
      <SwiperSlide className='text-center'>
        <div className='flex items-center justify-center gap-1 text-[30px]'> 
          <p className='font-bold italic'>ShipTraffic.live</p>
          <p>는 </p>
          <p className='text-[#47B5FF]'>선박의 실시간 정보</p>
          <p>를 알려줍니다.</p>
        </div>
        <p className='mt-2 mb-5 text-[18px]'>선박의 도착시각을 예측하여 효과적인 대응체계를 구축할 수 있도록 도와줍니다.</p>
        <img src={carousel} alt='배너사진'/>
      </SwiperSlide>

      <SwiperSlide className='text-center'>
        <div className='flex items-center justify-center gap-1 text-[30px]'> 
          <p className='font-bold italic'>ShipTraffic.live</p>
          <p>는 </p>
          <p className='text-[#47B5FF]'>선박의 항로</p>
          <p>를 보여줍니다.</p>
        </div>
        <p className='mt-2 mb-5 text-[18px]'>선박의 실시간 위치와 항로를 보여줍니다.</p>
        <img src={다운로드} alt='배너사진' />
      </SwiperSlide>

      <SwiperSlide className='text-center'>
        <div className='flex items-center justify-center gap-1 text-[30px]'> 
          <p className='font-bold italic'>ShipTraffic.live</p>
          <p>는 </p>
          <p className='text-[#47B5FF]'>모든 선박들의 실시간 위치</p>
          <p>를 알려줍니다.</p>
        </div>
        <p className='mt-2 mb-5 '>항구 주변 50마일 이내의 모든 선박들의 실시간 위치를 제공함으로서 항구 주변 상황을 한눈에 파악할 수 있습니다.</p>
        <img src={다운로드} alt='배너사진' />
      </SwiperSlide>
    
      
    </Swiper>
      
      </div>
  )
}

export default Carousel