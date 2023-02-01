import React from 'react'
import half from '../img/half.png'

const Home = () => {
  return (<>
    <div className="z-10 bg-white h-[82px] w-screen absolute"/>
    <div className="z-0 absolute"/>
      <div className='bg-gray-100 h-screen'>
        {/* 배너화면 */}
        <div className="pl-48 pt-44 pb-[89px] w-screen bg-blue-500 h-[80vh] text-white text-xl">
          <div className='flex gap-40'>
            <div>
              <h2 className='mt-10 text-4xl'>선박 도착예측 시간 서비스</h2>
              <h3 className='pt-3 font-bold text-[30px] italic animate-wobble'>ShipTraffic.live</h3>
            </div>
          <img src={half} alt='배너사진' className='w-[768px] h-[388px] animate-slide'/>
          </div>
        </div>
         <div className='bg-green-400 h-screen'>
          </div>
    </div>
      </>
  )
}

export default Home