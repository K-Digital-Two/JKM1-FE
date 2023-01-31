import React from 'react'
import Carousel from '../component/Carousel'
import Banner from '../img/carousel.png'

const Home = () => {
  return (<>
    <div className="z-10 bg-white h-[82px] w-screen"/>
    <div className="z-0 absolute"/>
      <div className='bg-gray-100 h-screen'>
        {/* 배너화면 */}
        <div className="flex pl-48 pt-44 pb-[89px] bg-blue-500 h-[50vh] text-white text-xl">
          <h2 className=''>선박 도착예측 시간 서비스</h2>
            <img src={Banner} alt='배너사진' className='animate-wobble'/>
          <p></p>
        </div>
      <div className='bg-white h-[50vh]'>
        <Carousel/>
      </div>


 

       
    </div>
      </>
  )
}

export default Home