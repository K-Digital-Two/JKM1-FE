import React from 'react'
import half from '../img/half.png'
import bg from '../img/bg.png'
import Carousel from '../component/Carousel'

const Home = () => {
  
  return (
    <div className='h-screen overflow-auto absolute'>
      <div className="z-10 bg-white h-[82px] sticky top-0"/>
      {/* 배너화면 */}
      <img src={bg} alt='background' className='absolute -z-20 w-screen'/>
      <div className="pt-20 pb-[89px] w-screen h-[80vh] text-[#06283D] text-xl">
        <div className='flex gap-40 justify-center'>
          <div>
            <h2 className='mt-10 text-3xl'>실시간 선박 도착예측 시간 서비스</h2>
            <h3 className='pt-7 font-bold text-[70px] italic animate-wobble'>ShipTraffic.live</h3>
          </div>
          <img src={half} alt='배너사진' className='w-[40%] h-[40%]'/>
        </div>
      </div>
      <div className='w-screen h-[90vh] bg-gray-200 py-16'>
        <Carousel/>
      </div>
    </div>
  )
}

export default Home